import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Meteor from '../src/Meteor';
import { Collection } from '../src/Collection';
import { MockDDPServer, type DDPMessage } from './helpers/ddp-server';

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

describe('Methods and Collections against mock server', () => {
    let server: MockDDPServer;

    beforeEach(async () => {
        server = new MockDDPServer();
        Meteor.connect(server.endpoint, { SocketConstructor: server.SocketConstructor });
        await waitFor(() => Meteor.status().connected);
    });

    afterEach(() => {
        Meteor.disconnect();
        server.stop();
    });

    async function respondToNextMethod(reply: (method: DDPMessage) => DDPMessage | null) {
        const method = await server.nextMessage('method');
        const response = reply(method);
        if (response) server.send({ ...response, id: method.id });
    }

    it('callAsync resolves with the result', async () => {
        const promise = Meteor.callAsync('add', 1, 2);
        void respondToNextMethod(() => ({ msg: 'result', result: 3 }));
        await expect(promise).resolves.toBe(3);
    });

    it('callAsync rejects with a MeteorError the server threw', async () => {
        const promise = Meteor.callAsync('explode');
        void respondToNextMethod(() => ({
            msg: 'result',
            error: { error: 'not-authorized', reason: 'Nope', isClientSafe: true, errorType: 'Meteor.Error' },
        }));
        await expect(promise).rejects.toMatchObject({ error: 'not-authorized' });
    });

    it('insertAsync writes optimistically, confirms on server ack', async () => {
        const posts = new Collection('posts');
        const promise = posts.insertAsync({ _id: 'p1', title: 'hello' });
        expect(posts.findOne('p1')).toMatchObject({ title: 'hello' }); // optimistic
        void respondToNextMethod((m) => {
            expect(m.method).toBe('/posts/insert');
            return { msg: 'result', result: 'p1' };
        });
        await expect(promise).resolves.toBe('p1');
        expect(posts.findOne('p1')).toMatchObject({ title: 'hello' });
    });

    it('insertAsync rolls back the optimistic write on server error', async () => {
        const posts = new Collection('posts');
        const promise = posts.insertAsync({ _id: 'p2', title: 'doomed' });
        expect(posts.findOne('p2')).toBeDefined();
        void respondToNextMethod(() => ({
            msg: 'result',
            error: { error: 403, reason: 'Access denied', isClientSafe: true },
        }));
        await expect(promise).rejects.toMatchObject({ error: 403 });
        expect(posts.findOne('p2')).toBeUndefined(); // rolled back
    });

    it('updateAsync applies full modifiers optimistically and rolls back on error (v3 regression: no rollback, $set only)', async () => {
        const posts = new Collection('posts');
        posts.rawCollection.upsert({ _id: 'p3', title: 'x', count: 1 });

        const good = posts.updateAsync('p3', { $inc: { count: 4 }, $set: { title: 'y' } });
        expect(posts.findOne('p3')).toMatchObject({ count: 5, title: 'y' }); // real modifier engine
        void respondToNextMethod(() => ({ msg: 'result', result: 1 }));
        await good;

        const bad = posts.updateAsync('p3', { $set: { title: 'forbidden' } });
        void respondToNextMethod(() => ({
            msg: 'result',
            error: { error: 403, reason: 'Access denied', isClientSafe: true },
        }));
        await expect(bad).rejects.toMatchObject({ error: 403 });
        expect(posts.findOne('p3')).toMatchObject({ count: 5, title: 'y' }); // snapshot restored
    });

    it('removeAsync restores the document on server error', async () => {
        const posts = new Collection('posts');
        posts.rawCollection.upsert({ _id: 'p4', title: 'keep me' });
        const promise = posts.removeAsync('p4');
        expect(posts.findOne('p4')).toBeUndefined(); // optimistic removal
        void respondToNextMethod(() => ({
            msg: 'result',
            error: { error: 403, reason: 'Access denied', isClientSafe: true },
        }));
        await expect(promise).rejects.toMatchObject({ error: 403 });
        expect(posts.findOne('p4')).toMatchObject({ title: 'keep me' });
    });

    it('schema hook (Standard Schema) rejects invalid writes before any traffic', async () => {
        const schema = {
            '~standard': {
                version: 1 as const,
                vendor: 'test',
                validate(value: unknown) {
                    const doc = value as { title?: unknown };
                    return typeof doc.title === 'string'
                        ? { value: doc }
                        : { issues: [{ message: 'title must be a string' }] };
                },
            },
        };
        const posts = new Collection('validated', { schema });
        await expect(posts.insertAsync({ title: 42 })).rejects.toMatchObject({
            error: 'validation-error',
        });
        expect(server.messages.filter((m) => m.msg === 'method')).toHaveLength(0);
    });

    it('transforms apply to find results and preserve _id (v3 regression: inverted guard)', () => {
        const posts = new Collection<{ _id: string; loud: string }>('posts2', {
            transform: (doc) => ({ loud: String(doc.title).toUpperCase() }) as never,
        });
        posts.rawCollection.upsert({ _id: 't1', title: 'quiet' });
        const doc = posts.findOne('t1');
        expect(doc).toEqual({ loud: 'QUIET', _id: 't1' });
    });

    it('subscription readyPromise resolves on ready and rejects on nosub error', async () => {
        const okHandle = Meteor.subscribe('goodSub');
        const okSub = await server.nextMessage('sub');
        server.send({ msg: 'ready', subs: [okSub.id] });
        await expect(okHandle.readyPromise).resolves.toBeUndefined();
        expect(okHandle.ready()).toBe(true);

        const badHandle = Meteor.subscribe('badSub');
        const badSub = await server.nextMessage('sub');
        server.send({ msg: 'nosub', id: badSub.id, error: { error: 404, reason: 'No such publication', isClientSafe: true } });
        await expect(badHandle.readyPromise).rejects.toMatchObject({ error: 404 });
        expect(badHandle.ready()).toBe(false);
    });
});
