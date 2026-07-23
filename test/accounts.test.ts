import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Meteor, { Accounts } from '../src/Meteor';
import { configureOptionalDeps } from '../src/config';
import { MockDDPServer, type DDPMessage } from './helpers/ddp-server';

const TOKEN_KEY = 'reactnativemeteor_usertoken';

class MemoryStorage {
    private map = new Map<string, string>();
    async getItem(key: string) {
        return this.map.get(key) ?? null;
    }
    async setItem(key: string, value: string) {
        this.map.set(key, value);
    }
    async removeItem(key: string) {
        this.map.delete(key);
    }
}

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

describe('accounts against mock server', () => {
    let server: MockDDPServer;
    let storage: MemoryStorage;

    beforeEach(async () => {
        server = new MockDDPServer();
        storage = new MemoryStorage();
        configureOptionalDeps({ Storage: storage });
        Meteor.connect(server.endpoint, { SocketConstructor: server.SocketConstructor });
        await waitFor(() => Meteor.status().connected);
    });

    afterEach(() => {
        Meteor.disconnect();
        server.stop();
        configureOptionalDeps({ Storage: null });
    });

    async function replyToMethod(name: string, reply: (m: DDPMessage) => DDPMessage) {
        const method = await server.nextMessage('method');
        expect(method.method).toBe(name);
        server.send({ ...reply(method), id: method.id });
    }

    it('loginWithPassword hashes the password, persists the token, sets userId', async () => {
        const login = Meteor.loginWithPassword('user@example.com', 'hunter2');
        await replyToMethod('login', (m) => {
            const [args] = m.params as [{ user: { email: string }; password: { digest: string; algorithm: string } }];
            expect(args.user).toEqual({ email: 'user@example.com' });
            expect(args.password.algorithm).toBe('sha-256');
            expect(args.password.digest).toMatch(/^[0-9a-f]{64}$/);
            return { msg: 'result', result: { id: 'u1', token: 'tok-1' } };
        });
        await expect(login).resolves.toMatchObject({ id: 'u1', token: 'tok-1' });
        expect(Meteor.userId()).toBe('u1');
        expect(Meteor.loggingIn()).toBe(false);
        expect(await storage.getItem(TOKEN_KEY)).toBe('tok-1');
    });

    it('failed login clears state and rejects', async () => {
        const login = Meteor.loginWithPassword('user@example.com', 'wrong');
        await replyToMethod('login', () => ({
            msg: 'result',
            error: { error: 403, reason: 'Incorrect password', isClientSafe: true },
        }));
        await expect(login).rejects.toMatchObject({ error: 403 });
        expect(Meteor.userId()).toBeNull();
        expect(await storage.getItem(TOKEN_KEY)).toBeNull();
    });

    it('logout clears the stored token even before server ack ordering', async () => {
        await storage.setItem(TOKEN_KEY, 'tok-x');
        const logout = Meteor.logout();
        await replyToMethod('logout', () => ({ msg: 'result', result: null }));
        await logout;
        expect(await storage.getItem(TOKEN_KEY)).toBeNull();
        expect(Meteor.userId()).toBeNull();
    });

    it('createUser does not mutate the caller options and logs in', async () => {
        const options = { username: 'kelly', password: 'secret' };
        const create = Accounts.createUser(options);
        await replyToMethod('createUser', (m) => {
            const [sent] = m.params as [{ password: { algorithm: string } }];
            expect(sent.password.algorithm).toBe('sha-256');
            return { msg: 'result', result: { id: 'u2', token: 'tok-2' } };
        });
        await create;
        expect(options.password).toBe('secret'); // v3 replaced this with the hash
        expect(Meteor.userId()).toBe('u2');
    });

    it('resetPassword logs in with the returned token', async () => {
        const reset = Accounts.resetPassword('reset-tok', 'newpass');
        await replyToMethod('resetPassword', () => ({
            msg: 'result',
            result: { id: 'u3', token: 'tok-3' },
        }));
        await reset;
        expect(Meteor.userId()).toBe('u3');
        expect(await storage.getItem(TOKEN_KEY)).toBe('tok-3');
    });

    it('resumes the stored session on connect (token login)', async () => {
        Meteor.disconnect();
        server.stop();

        await storage.setItem(TOKEN_KEY, 'stored-token');
        server = new MockDDPServer();
        Meteor.connect(server.endpoint, { SocketConstructor: server.SocketConstructor });
        await replyToMethod('login', (m) => {
            const [args] = m.params as [{ resume: string }];
            expect(args.resume).toBe('stored-token');
            return { msg: 'result', result: { id: 'u9', token: 'stored-token' } };
        });
        await waitFor(() => Meteor.userId() === 'u9');
    });

    it('onLogin / onLogout hooks fire', async () => {
        const events: string[] = [];
        Accounts.onLogin(() => events.push('login'));
        Accounts.onLogout(() => events.push('logout'));

        const login = Meteor.loginWithPassword('a@b.c', 'pw');
        await replyToMethod('login', () => ({ msg: 'result', result: { id: 'u5', token: 't5' } }));
        await login;

        const logout = Meteor.logout();
        await replyToMethod('logout', () => ({ msg: 'result', result: null }));
        await logout;

        expect(events).toEqual(['login', 'logout']);
    });

    it('changePassword validates and sends hashed passwords', async () => {
        await expect(Accounts.changePassword('old', '')).rejects.toMatchObject({ error: 'EmptyPassword' });
        const change = Accounts.changePassword('oldpw', 'newpw');
        await replyToMethod('changePassword', (m) => {
            const [oldHash, newHash] = m.params as [{ algorithm: string }, { algorithm: string }];
            expect(oldHash.algorithm).toBe('sha-256');
            expect(newHash.algorithm).toBe('sha-256');
            return { msg: 'result', result: { passwordChanged: true } };
        });
        await expect(change).resolves.toBeUndefined();
    });
});
