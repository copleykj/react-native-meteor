import { describe, it, expect, vi } from 'vitest';
import Random from '../../src/lib/random';
import MeteorError from '../../src/lib/error';
import MongoID, { ObjectID } from '../../src/lib/mongo-id';
import EventEmitter from '../../src/lib/emitter';
import EJSON from '../../src/lib/ejson';
import { hashPassword, isPlainObject, contains } from '../../src/lib/utils';

describe('Random', () => {
    it('generates 17-char unmistakable ids by default', () => {
        const id = Random.id();
        expect(id).toHaveLength(17);
        expect(id).toMatch(/^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]+$/);
    });

    it('generates hexString (regression: v3 was missing it, breaking ObjectID)', () => {
        const hex = Random.hexString(24);
        expect(hex).toHaveLength(24);
        expect(hex).toMatch(/^[0-9a-f]{24}$/);
    });

    it('generates distinct ids', () => {
        const ids = new Set(Array.from({ length: 1000 }, () => Random.id()));
        expect(ids.size).toBe(1000);
    });

    it('fraction is in [0, 1)', () => {
        for (let i = 0; i < 100; i++) {
            const f = Random.fraction();
            expect(f).toBeGreaterThanOrEqual(0);
            expect(f).toBeLessThan(1);
        }
    });

    it('choice picks from arrays and strings', () => {
        expect([1, 2, 3]).toContain(Random.choice([1, 2, 3]));
        expect('abc').toContain(Random.choice('abc'));
        expect(Random.choice([])).toBeUndefined();
    });

    it('secret defaults to 43 chars', () => {
        expect(Random.secret()).toHaveLength(43);
    });
});

describe('MeteorError', () => {
    it('carries error/reason/details and formats the message like Meteor', () => {
        const error = new MeteorError('not-authorized', 'Not authorized', 'extra');
        expect(error.error).toBe('not-authorized');
        expect(error.reason).toBe('Not authorized');
        expect(error.details).toBe('extra');
        expect(error.message).toBe('Not authorized [not-authorized]');
        expect(error).toBeInstanceOf(Error);
    });

    it('round-trips through EJSON as Meteor.Error', () => {
        const original = new MeteorError(403, 'Forbidden');
        const revived = EJSON.parse(EJSON.stringify(original)) as MeteorError;
        expect(revived).toBeInstanceOf(MeteorError);
        expect(revived.error).toBe(403);
        expect(revived.reason).toBe('Forbidden');
    });
});

describe('MongoID.ObjectID', () => {
    it('generates a 24-hex id when constructed bare (regression: threw in v3)', () => {
        const oid = new ObjectID();
        expect(oid.toHexString()).toMatch(/^[0-9a-f]{24}$/);
    });

    it('accepts and normalizes an explicit hex string', () => {
        const oid = new ObjectID('AAAAAAAAAAAAAAAAAAAAAAAA');
        expect(oid.toHexString()).toBe('aaaaaaaaaaaaaaaaaaaaaaaa');
        expect(oid.equals(new ObjectID('aaaaaaaaaaaaaaaaaaaaaaaa'))).toBe(true);
    });

    it('rejects invalid hex strings', () => {
        expect(() => new ObjectID('nope')).toThrow(/Invalid hexadecimal/);
    });

    it('round-trips through EJSON as oid', () => {
        const oid = new ObjectID();
        const revived = EJSON.parse(EJSON.stringify(oid)) as ObjectID;
        expect(revived).toBeInstanceOf(ObjectID);
        expect(revived.equals(oid)).toBe(true);
    });

    it('idStringify/idParse round-trip the Meteor escaping rules', () => {
        expect(MongoID.idStringify('plain')).toBe('plain');
        expect(MongoID.idStringify('-dashed')).toBe('--dashed');
        expect(MongoID.idParse('--dashed')).toBe('-dashed');
        expect(MongoID.idStringify(undefined)).toBe('-');
        expect(MongoID.idParse('-')).toBeUndefined();
        expect(MongoID.idStringify(true)).toBe('~true');
        expect(MongoID.idParse('~true')).toBe(true);
        const oid = new ObjectID();
        expect(MongoID.idParse(MongoID.idStringify(oid))).toBeInstanceOf(ObjectID);
    });
});

describe('EventEmitter', () => {
    it('delivers synchronously in subscription order', () => {
        const emitter = new EventEmitter();
        const seen: number[] = [];
        emitter.on('x', () => seen.push(1));
        emitter.on('x', () => seen.push(2));
        emitter.emit('x');
        expect(seen).toEqual([1, 2]);
    });

    it('passes arguments, supports once and off', () => {
        const emitter = new EventEmitter();
        const spy = vi.fn();
        const onceSpy = vi.fn();
        emitter.on('x', spy);
        emitter.once('x', onceSpy);
        emitter.emit('x', 'a', 'b');
        emitter.emit('x', 'c');
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(1, 'a', 'b');
        expect(onceSpy).toHaveBeenCalledTimes(1);
        emitter.off('x', spy);
        emitter.emit('x');
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('mid-emit unsubscribe does not skip other listeners', () => {
        const emitter = new EventEmitter();
        const seen: string[] = [];
        const a = () => {
            seen.push('a');
            emitter.off('x', a);
        };
        emitter.on('x', a);
        emitter.on('x', () => seen.push('b'));
        emitter.emit('x');
        expect(seen).toEqual(['a', 'b']);
    });
});

describe('utils', () => {
    it('hashPassword matches the accounts-password wire format (SHA-256 test vector)', () => {
        expect(hashPassword('password')).toEqual({
            digest: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
            algorithm: 'sha-256',
        });
    });

    it('isPlainObject distinguishes documents from special types', () => {
        expect(isPlainObject({ a: 1 })).toBe(true);
        expect(isPlainObject([1])).toBe(false);
        expect(isPlainObject(new Date())).toBe(false);
        expect(isPlainObject(/x/)).toBe(false);
        expect(isPlainObject(new ObjectID())).toBe(false);
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject('str')).toBe(false);
    });

    it('contains works', () => {
        expect(contains([1, 2], 2)).toBe(true);
        expect(contains([1, 2], 3)).toBe(false);
    });
});
