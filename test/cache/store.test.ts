import { describe, it, expect, vi } from 'vitest';
import { Cache, LocalCollection, type ChangeEvent } from '../../src/cache/store';

const microtask = () => new Promise<void>((resolve) => queueMicrotask(resolve));

describe('LocalCollection', () => {
    it('upsert adds then merges (DDP changed messages carry partial fields)', () => {
        const posts = new LocalCollection('posts');
        posts.upsert({ _id: '1', title: 'a', body: 'text' });
        posts.upsert({ _id: '1', title: 'b' });
        expect(posts.get('1')).toEqual({ _id: '1', title: 'b', body: 'text' });
    });

    it('del removes; get returns undefined', () => {
        const posts = new LocalCollection('posts');
        posts.upsert({ _id: '1', title: 'a' });
        posts.del('1');
        expect(posts.get('1')).toBeUndefined();
    });

    it('find applies selector, sort, skip, limit, fields', () => {
        const posts = new LocalCollection('posts');
        for (let i = 1; i <= 5; i++) {
            posts.upsert({ _id: String(i), n: i, tag: i % 2 ? 'odd' : 'even', secret: 'x' });
        }
        const result = posts.find({ tag: 'odd' }, { sort: { n: -1 }, skip: 1, limit: 2, fields: { secret: 0 } });
        expect(result.map((doc) => doc.n)).toEqual([3, 1]);
        expect(result[0]).not.toHaveProperty('secret');
    });

    it('findOne returns first match or undefined', () => {
        const posts = new LocalCollection('posts');
        posts.upsert({ _id: '1', n: 1 });
        expect(posts.findOne({ n: 1 })?._id).toBe('1');
        expect(posts.findOne({ n: 99 })).toBeUndefined();
    });

    it('batches change events per microtask with typed events', async () => {
        const posts = new LocalCollection('posts');
        const batches: ChangeEvent[][] = [];
        posts.onChange((events) => batches.push(events));

        posts.upsert({ _id: '1', title: 'a' });
        posts.upsert({ _id: '1', title: 'b' });
        posts.del('1');
        expect(batches).toHaveLength(0); // nothing synchronously

        await microtask();
        expect(batches).toHaveLength(1);
        expect(batches[0]).toEqual([
            { type: 'added', id: '1', fields: { title: 'a' } },
            { type: 'changed', id: '1', fields: { title: 'b' } },
            { type: 'removed', id: '1' },
        ]);
    });

    it('offChange unsubscribes', async () => {
        const posts = new LocalCollection('posts');
        const spy = vi.fn();
        posts.onChange(spy);
        posts.offChange(spy);
        posts.upsert({ _id: '1' });
        await microtask();
        expect(spy).not.toHaveBeenCalled();
    });

    it('del of a missing id emits nothing', async () => {
        const posts = new LocalCollection('posts');
        const spy = vi.fn();
        posts.onChange(spy);
        posts.del('nope');
        await microtask();
        expect(spy).not.toHaveBeenCalled();
    });
});

describe('Cache', () => {
    it('addCollection is idempotent and exposes legacy property access', () => {
        const db = new Cache();
        const users = db.addCollection('users');
        expect(db.addCollection('users')).toBe(users);
        expect((db as unknown as Record<string, unknown>).users).toBe(users);
        expect(db.collection('users')).toBe(users);
    });

    it('refuses to shadow Cache members via property access', () => {
        const db = new Cache();
        const evil = db.addCollection('emit');
        expect(typeof db.emit).toBe('function'); // not clobbered
        expect(db.collection('emit')).toBe(evil); // still reachable safely
    });

    it('emits one coarse change per microtask across collections', async () => {
        const db = new Cache();
        const spy = vi.fn();
        db.on('change', spy);
        db.collection('a').upsert({ _id: '1' });
        db.collection('b').upsert({ _id: '2' });
        await microtask();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('routes the coarse change through batchedUpdates when configured', async () => {
        const db = new Cache();
        const order: string[] = [];
        db.batchedUpdates = (fn) => {
            order.push('batched');
            fn();
        };
        db.on('change', () => order.push('change'));
        db.collection('a').upsert({ _id: '1' });
        await microtask();
        expect(order).toEqual(['batched', 'change']);
    });
});
