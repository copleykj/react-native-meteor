// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor as rtlWaitFor } from '@testing-library/react';
import Meteor, { useTracker, useFind, useSubscribe, useUserId, ReactiveDict } from '../src/Meteor';
import { Collection } from '../src/Collection';
import Tracker from '../src/tracker';
import Data from '../src/Data';
import { MockDDPServer } from './helpers/ddp-server';

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

describe('React hooks', () => {
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

    it('useTracker re-renders on ReactiveDict change and cleans up its listeners', async () => {
        const dict = new ReactiveDict();
        dict.set('color', 'red');

        const listenersBefore = (Data as unknown as { _cbs: unknown[] })._cbs.length;
        const { result, unmount, rerender } = renderHook(() => useTracker(() => dict.get('color'), []));
        expect(result.current).toBe('red');

        act(() => {
            dict.set('color', 'blue');
            Tracker.flush();
        });
        await rtlWaitFor(() => expect(result.current).toBe('blue'));

        // v3 leaked one Data.onChange listener per render.
        rerender();
        rerender();
        unmount();
        expect((Data as unknown as { _cbs: unknown[] })._cbs.length).toBe(listenersBefore);
    });

    it('useTracker skipUpdate suppresses re-renders', async () => {
        const dict = new ReactiveDict();
        dict.set('n', 1);
        let renders = 0;
        const { result } = renderHook(() => {
            renders++;
            return useTracker(
                () => dict.get('n'),
                [],
                (prev, next) => prev === next || Number(next) % 2 === 0, // skip even values
            );
        });
        expect(result.current).toBe(1);
        act(() => {
            dict.set('n', 2);
            Tracker.flush();
        });
        await new Promise((r) => setTimeout(r, 20));
        expect(result.current).toBe(1); // skipped
        const rendersAfterSkip = renders;
        act(() => {
            dict.set('n', 3);
            Tracker.flush();
        });
        await rtlWaitFor(() => expect(result.current).toBe(3));
        expect(renders).toBeGreaterThan(rendersAfterSkip);
    });

    it('useFind re-renders from per-collection events only', async () => {
        const items = new Collection<{ _id: string; n: number }>('finditems');
        items.rawCollection.upsert({ _id: '1', n: 1 });

        const { result } = renderHook(() => useFind(() => items.find({}, { sort: { n: 1 } }), []));
        expect(result.current.map((d) => d.n)).toEqual([1]);

        act(() => {
            items.rawCollection.upsert({ _id: '2', n: 2 });
        });
        await rtlWaitFor(() => expect(result.current).toHaveLength(2));

        // A write to an unrelated collection must not re-render this hook.
        const before = result.current;
        act(() => {
            Data.db.collection('unrelated').upsert({ _id: 'x' });
        });
        await new Promise((r) => setTimeout(r, 20));
        expect(result.current).toBe(before); // same array reference
    });

    it('useSubscribe reflects readiness reactively', async () => {
        const { result } = renderHook(() => useSubscribe('items'));
        expect(result.current).toBe(false);
        const sub = await server.nextMessage('sub');
        server.send({ msg: 'ready', subs: [sub.id] });
        await rtlWaitFor(() => expect(result.current).toBe(true));
    });

    it('useUserId tracks login state', async () => {
        const { result } = renderHook(() => useUserId());
        expect(result.current).toBeNull();
        const login = Meteor.loginWithPassword('a@b.c', 'pw');
        const method = await server.nextMessage('method');
        server.send({ msg: 'result', id: method.id, result: { id: 'u7', token: 't7' } });
        await login.catch(() => {});
        await rtlWaitFor(() => expect(result.current).toBe('u7'));
    });
});
