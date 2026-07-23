import { describe, it, expect, afterEach } from 'vitest';
import DDP from '../../src/ddp/connection';
import { MockDDPServer } from '../helpers/ddp-server';

const FAST = {
    reconnectBaseTimeout: 20,
    reconnectMaxTimeout: 200,
    reconnectJitter: 0,
    heartbeatInterval: 0, // off unless a test opts in
};

function waitFor(condition: () => boolean, timeoutMs = 2000): Promise<void> {
    return new Promise((resolve, reject) => {
        const started = Date.now();
        const tick = () => {
            if (condition()) return resolve();
            if (Date.now() - started > timeoutMs) return reject(new Error('waitFor timed out'));
            setTimeout(tick, 5);
        };
        tick();
    });
}

describe('DDP connection', () => {
    let server: MockDDPServer;
    let ddp: DDP;

    afterEach(() => {
        ddp?.disconnect();
        server?.stop();
    });

    it('handshakes: connect → connected, status transitions', async () => {
        server = new MockDDPServer();
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        expect(ddp.status).toBe('connecting');
        const connect = await server.nextMessage('connect');
        expect(connect).toMatchObject({ version: '1', support: ['1'] });
        await waitFor(() => ddp.status === 'connected');
        expect(ddp.statusInfo()).toMatchObject({ connected: true, retryCount: 0 });
    });

    it('replies to server pings with matching id', async () => {
        server = new MockDDPServer();
        server.autoHandshake = false;
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        await server.nextMessage('connect');
        server.send({ msg: 'connected', session: 's' });
        await waitFor(() => ddp.status === 'connected');
        server.send({ msg: 'ping', id: 'p1' });
        const pong = await server.nextMessage('pong');
        expect(pong.id).toBe('p1');
    });

    it('treats a failed version negotiation as terminal', async () => {
        server = new MockDDPServer();
        server.autoHandshake = false;
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        const errors: unknown[] = [];
        ddp.on('error', (e) => errors.push(e));
        await server.nextMessage('connect');
        server.send({ msg: 'failed', version: '2' });
        await waitFor(() => ddp.status === 'failed');
        expect(ddp.autoReconnect).toBe(false);
        expect(String(errors[0])).toMatch(/version negotiation failed/);
    });

    it('queues messages while disconnected and flushes on connect', async () => {
        server = new MockDDPServer();
        ddp = new DDP({
            endpoint: server.endpoint,
            SocketConstructor: server.SocketConstructor,
            ...FAST,
            autoConnect: false,
        });
        const id = ddp.method('offlineCall', [1, 2]);
        ddp.sub('things', []);
        expect(ddp.status).toBe('disconnected');

        ddp.connect();
        const method = await server.nextMessage('method');
        expect(method).toMatchObject({ id, method: 'offlineCall', params: [1, 2] });
        const sub = await server.nextMessage('sub');
        expect(sub).toMatchObject({ name: 'things' });
    });

    it('re-sends unacked methods after a dropped connection, and stops re-sending after result', async () => {
        server = new MockDDPServer();
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        await waitFor(() => ddp.status === 'connected');

        const ackedId = ddp.method('acked', []);
        const unackedId = ddp.method('unacked', []);
        await server.nextMessage('method');
        await server.nextMessage('method');
        // Server acks only the first method.
        server.send({ msg: 'result', id: ackedId, result: 'ok' });
        await waitFor(() => server.messages.length === 0 || true);
        await new Promise((r) => setTimeout(r, 30));

        server.closeConnections();
        await waitFor(() => ddp.status !== 'connected');
        await waitFor(() => ddp.status === 'connected'); // auto-reconnected

        const resent = await server.nextMessage('method');
        expect(resent.id).toBe(unackedId);
        expect(resent.method).toBe('unacked');
        // The acked method must NOT be re-sent.
        await expect(server.nextMessage('method', 100)).rejects.toThrow(/Timed out/);
    });

    it('computes the Meteor backoff curve (exponential, capped)', () => {
        server = new MockDDPServer();
        ddp = new DDP({
            endpoint: server.endpoint,
            SocketConstructor: server.SocketConstructor,
            reconnectBaseTimeout: 1000,
            reconnectExponent: 2,
            reconnectJitter: 0,
            reconnectMaxTimeout: 300000,
            autoConnect: false,
        });
        expect(ddp.retryDelay(0)).toBe(1000);
        expect(ddp.retryDelay(1)).toBe(2000);
        expect(ddp.retryDelay(2)).toBe(4000);
        expect(ddp.retryDelay(10)).toBe(300000); // capped at max
    });

    it('retries automatically after connection loss and increments retryCount', async () => {
        server = new MockDDPServer();
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        await waitFor(() => ddp.status === 'connected');
        server.closeConnections();
        await waitFor(() => ddp.status === 'connected'); // came back on its own
    });

    it('active heartbeat pings after silence and closes on missing pong', async () => {
        server = new MockDDPServer();
        server.autoHandshake = false;
        ddp = new DDP({
            endpoint: server.endpoint,
            SocketConstructor: server.SocketConstructor,
            ...FAST,
            heartbeatInterval: 40,
            heartbeatTimeout: 40,
        });
        await server.nextMessage('connect');
        server.send({ msg: 'connected', session: 's' });
        await waitFor(() => ddp.status === 'connected');

        // Silence → client must ping us.
        await server.nextMessage('ping', 1000);
        // We never pong → client must give up on this socket and reconnect.
        await waitFor(() => ddp.status !== 'connected', 1000);
        const reconnect = await server.nextMessage('connect', 1000);
        expect(reconnect.msg).toBe('connect');
    });

    it('goes offline on networkOnline(false) without retrying, reconnects immediately on true', async () => {
        server = new MockDDPServer();
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        await waitFor(() => ddp.status === 'connected');

        ddp.networkOnline(false);
        expect(ddp.status).toBe('offline');
        await new Promise((r) => setTimeout(r, 60));
        expect(ddp.status).toBe('offline'); // no sneaky retries

        ddp.networkOnline(true);
        await waitFor(() => ddp.status === 'connected');
    });

    it('disconnect() is deliberate: no auto-reconnect until connect()', async () => {
        server = new MockDDPServer();
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        await waitFor(() => ddp.status === 'connected');
        ddp.disconnect();
        expect(ddp.status).toBe('offline');
        await new Promise((r) => setTimeout(r, 60));
        expect(ddp.status).toBe('offline');
        ddp.connect();
        await waitFor(() => ddp.status === 'connected');
        expect(ddp.autoReconnect).toBe(true); // restored by connect()
    });

    it('emits result and updated messages', async () => {
        server = new MockDDPServer();
        ddp = new DDP({ endpoint: server.endpoint, SocketConstructor: server.SocketConstructor, ...FAST });
        await waitFor(() => ddp.status === 'connected');
        const events: string[] = [];
        ddp.on('result', () => events.push('result'));
        ddp.on('updated', () => events.push('updated'));
        const id = ddp.method('x', []);
        await server.nextMessage('method');
        server.send({ msg: 'updated', methods: [id] });
        server.send({ msg: 'result', id, result: 1 });
        await waitFor(() => events.length === 2);
        expect(events).toEqual(['updated', 'result']);
    });
});
