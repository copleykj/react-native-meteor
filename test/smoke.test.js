import { describe, it, expect } from 'vitest';
import Meteor, { withTracker, useTracker, Accounts, ReactiveDict, Mongo, Random, EJSON } from '../src/Meteor';
import { MockDDPServer } from './helpers/ddp-server';

describe('public API surface (v3 parity)', () => {
    it('exposes the documented API on the default export', () => {
        for (const key of [
            'connect', 'disconnect', 'reconnect', 'status', 'subscribe', 'call',
            'user', 'userId', 'loggingIn', 'logout', 'loginWithPassword',
            'withTracker', 'useTracker', 'configureOptionalDeps', 'getData',
        ]) {
            expect(Meteor[key], key).toBeTypeOf('function');
        }
        expect(Meteor.isClient).toBe(true);
        expect(Meteor.Mongo.Collection).toBeTypeOf('function');
        expect(Meteor.Accounts).toBeTruthy();
        expect(Meteor.ReactiveDict).toBeTypeOf('function');
    });

    it('exposes standalone pieces as named exports', () => {
        expect(withTracker).toBeTypeOf('function');
        expect(useTracker).toBeTypeOf('function');
        expect(Accounts).toBeTruthy();
        expect(ReactiveDict).toBeTypeOf('function');
        expect(Mongo.Collection).toBeTypeOf('function');
        expect(Random.id()).toHaveLength(17);
        expect(EJSON.stringify({ a: 1 })).toBe('{"a":1}');
    });
});

describe('DDP connection against mock server', () => {
    it('completes the connect handshake and reports connected status', async () => {
        const server = new MockDDPServer();
        try {
            Meteor.connect(server.endpoint, { SocketConstructor: server.SocketConstructor });
            const connect = await server.nextMessage('connect');
            expect(connect.version).toBe('1');
            expect(connect.support).toEqual(['1']);

            await new Promise((resolve) => setTimeout(resolve, 50));
            expect(Meteor.status().connected).toBe(true);
        } finally {
            Meteor.disconnect();
            server.stop();
        }
    });
});
