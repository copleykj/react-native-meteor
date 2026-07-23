import { describe, it, expect } from 'vitest';
import Tracker from '../src/tracker';
import ReactiveDict from '../src/ReactiveDict';
import ReactiveVar from '../src/ReactiveVar';

describe('ReactiveDict', () => {
    it('set/get round-trips EJSON values', () => {
        const dict = new ReactiveDict();
        dict.set('str', 'x');
        dict.set('date', new Date(2020, 0, 1));
        dict.set('obj', { a: [1, 2] });
        expect(dict.get('str')).toBe('x');
        expect(dict.get('date')).toEqual(new Date(2020, 0, 1));
        expect(dict.get('obj')).toEqual({ a: [1, 2] });
        expect(dict.get('missing')).toBeUndefined();
    });

    it('set(object) sets each key to its value (regression: v3 set index→keyname)', () => {
        const dict = new ReactiveDict();
        dict.set({ a: 1, b: 'two' });
        expect(dict.get('a')).toBe(1);
        expect(dict.get('b')).toBe('two');
        expect(dict.get('0')).toBeUndefined();
    });

    it('per-key reactivity: only computations reading the key re-run', () => {
        const dict = new ReactiveDict();
        dict.set('a', 1);
        dict.set('b', 1);
        let aRuns = 0;
        let bRuns = 0;
        Tracker.autorun(() => {
            dict.get('a');
            aRuns++;
        });
        Tracker.autorun(() => {
            dict.get('b');
            bRuns++;
        });
        dict.set('a', 2);
        Tracker.flush();
        expect(aRuns).toBe(2);
        expect(bRuns).toBe(1);
    });

    it('set with unchanged value does not invalidate', () => {
        const dict = new ReactiveDict();
        dict.set('a', 1);
        let runs = 0;
        Tracker.autorun(() => {
            dict.get('a');
            runs++;
        });
        dict.set('a', 1);
        Tracker.flush();
        expect(runs).toBe(1);
    });

    it('equals() only re-runs when the answer flips', () => {
        const dict = new ReactiveDict();
        dict.set('color', 'red');
        let runs = 0;
        Tracker.autorun(() => {
            dict.equals('color', 'blue');
            runs++;
        });
        dict.set('color', 'green'); // blue-ness unchanged (false → false)
        Tracker.flush();
        expect(runs).toBe(1);
        dict.set('color', 'blue'); // flips
        Tracker.flush();
        expect(runs).toBe(2);
        expect(() => dict.equals('color', { obj: true } as never)).toThrow(/scalar/);
    });

    it('setDefault only sets missing keys (including explicitly-undefined ones)', () => {
        const dict = new ReactiveDict();
        dict.set('a', 1);
        dict.setDefault('a', 99);
        dict.setDefault('b', 2);
        expect(dict.get('a')).toBe(1);
        expect(dict.get('b')).toBe(2);
    });

    it('delete and clear invalidate their keys', () => {
        const dict = new ReactiveDict({ a: 1, b: 2 });
        let seen: unknown;
        Tracker.autorun(() => {
            seen = dict.get('a');
        });
        expect(dict.delete('a')).toBe(true);
        expect(dict.delete('a')).toBe(false);
        Tracker.flush();
        expect(seen).toBeUndefined();
        dict.clear();
        expect(dict.all()).toEqual({});
    });

    it('constructor seeds from an object', () => {
        const dict = new ReactiveDict({ a: 1 });
        expect(dict.get('a')).toBe(1);
    });
});

describe('ReactiveVar', () => {
    it('get/set with reactivity', () => {
        const v = new ReactiveVar(1);
        let seen = 0;
        Tracker.autorun(() => {
            seen = v.get();
        });
        v.set(2);
        Tracker.flush();
        expect(seen).toBe(2);
    });

    it('primitive equality suppresses invalidation; objects always invalidate', () => {
        const v = new ReactiveVar<unknown>(1);
        let runs = 0;
        Tracker.autorun(() => {
            v.get();
            runs++;
        });
        v.set(1);
        Tracker.flush();
        expect(runs).toBe(1);
        const obj = { a: 1 };
        v.set(obj);
        Tracker.flush();
        expect(runs).toBe(2);
        v.set(obj); // same reference, but objects always count as changed
        Tracker.flush();
        expect(runs).toBe(3);
    });

    it('honors a custom equals function', () => {
        const v = new ReactiveVar({ a: 1 }, (x, y) => x.a === y.a);
        let runs = 0;
        Tracker.autorun(() => {
            v.get();
            runs++;
        });
        v.set({ a: 1 });
        Tracker.flush();
        expect(runs).toBe(1);
    });
});
