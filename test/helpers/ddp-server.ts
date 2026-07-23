import { Server, WebSocket } from 'mock-socket';
import EJSON from 'ejson';

export interface DDPMessage {
    msg?: string;
    [key: string]: unknown;
}

/**
 * A scripted DDP v1 server for integration tests. Speaks just enough of the
 * protocol (connect handshake, ping/pong, sub/method acknowledgement) that
 * tests read like protocol transcripts:
 *
 *   const server = new MockDDPServer('ws://localhost:8123/websocket');
 *   Meteor.connect(server.endpoint, { SocketConstructor: server.SocketConstructor });
 *   await server.nextMessage('method');
 *   server.send({ msg: 'result', id, result: 42 });
 */
export class MockDDPServer {
    readonly endpoint: string;
    /** Pass as `SocketConstructor` so the client dials the mock, not the network. */
    readonly SocketConstructor = WebSocket;

    private server: Server;
    private sockets: import('mock-socket').Client[] = [];
    private inbox: DDPMessage[] = [];
    private waiters: Array<{ match: (m: DDPMessage) => boolean; resolve: (m: DDPMessage) => void }> = [];

    /** When true (default), replies to `connect` with `connected` and to `ping` with `pong`. */
    autoHandshake = true;

    constructor(endpoint = `ws://localhost:${8100 + Math.floor(Math.random() * 800)}/websocket`) {
        this.endpoint = endpoint;
        this.server = new Server(endpoint);
        this.server.on('connection', (socket) => {
            this.sockets.push(socket);
            socket.on('message', (raw) => {
                const message = EJSON.parse(String(raw)) as DDPMessage;
                if (this.autoHandshake && message.msg === 'connect') {
                    this.send({ msg: 'connected', session: 'mock-session' });
                }
                if (this.autoHandshake && message.msg === 'ping') {
                    this.send({ msg: 'pong', id: message.id });
                }
                this.receive(message);
            });
        });
    }

    /** All client → server messages seen so far. */
    get messages(): DDPMessage[] {
        return [...this.inbox];
    }

    /** Send a server → client message to every connected socket. */
    send(message: DDPMessage): void {
        const raw = EJSON.stringify(message);
        for (const socket of this.sockets) {
            socket.send(raw);
        }
    }

    /** Resolve with the next client message matching `msg` (or any, if omitted). */
    nextMessage(msg?: string, timeoutMs = 2000): Promise<DDPMessage> {
        const match = (m: DDPMessage) => (msg === undefined ? true : m.msg === msg);
        const already = this.inbox.find(match);
        if (already) {
            this.inbox.splice(this.inbox.indexOf(already), 1);
            return Promise.resolve(already);
        }
        return new Promise((resolve, reject) => {
            const waiter = { match, resolve };
            this.waiters.push(waiter);
            setTimeout(() => {
                const index = this.waiters.indexOf(waiter);
                if (index !== -1) {
                    this.waiters.splice(index, 1);
                    reject(new Error(`Timed out waiting for DDP message${msg ? ` "${msg}"` : ''}`));
                }
            }, timeoutMs);
        });
    }

    /** Drop all connected clients (simulates network loss). */
    closeConnections(): void {
        for (const socket of this.sockets) {
            socket.close();
        }
        this.sockets = [];
    }

    stop(): void {
        this.server.stop();
        this.sockets = [];
    }

    private receive(message: DDPMessage): void {
        const waiter = this.waiters.find((w) => w.match(message));
        if (waiter) {
            this.waiters.splice(this.waiters.indexOf(waiter), 1);
            waiter.resolve(message);
        } else {
            this.inbox.push(message);
        }
    }
}
