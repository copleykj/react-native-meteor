import { useMemo, useRef, useSyncExternalStore, type DependencyList } from 'react';
import useTracker from './useTracker';
import Tracker from '../tracker';
import EJSON from '../lib/ejson';
import User from '../user/User';
import Data from '../Data';
import type { Cursor } from '../Collection';
import type { Document } from '../cache/types';
import type { DDPStatus } from '../ddp/connection';

interface SubscribeHost {
    subscribe(name: string, ...args: unknown[]): { ready(): boolean; stop(): void };
    status(): { connected: boolean; status: DDPStatus; retryCount: number; retryTime: number | null };
}

/** Late-bound to avoid a circular import at module-eval time. */
let host: SubscribeHost | null = null;
export function bindHooksHost(meteor: SubscribeHost): void {
    host = meteor;
}

/**
 * Subscribe for the lifetime of the component; returns reactive readiness.
 * Pass `false` as the name to conditionally skip subscribing.
 *
 * Runs inside a Tracker computation, so Meteor.subscribe's dedup logic
 * reuses the existing subscription across re-renders with equal params.
 */
export function useSubscribe(name: string | false, ...params: unknown[]): boolean {
    // Re-run only when the subscription identity actually changes.
    const paramsKey = EJSON.stringify(params);
    return useTracker(
        () => {
            if (name === false || !host) return true;
            return host.subscribe(name, ...params).ready();
        },
        [name, paramsKey],
    );
}

/**
 * Fetch a cursor's documents, re-rendering only when THAT collection
 * changes — the finest-grained hook; skips the coarse global change event
 * entirely.
 */
export function useFind<T>(cursorFn: () => Cursor<T>, deps: DependencyList = []): T[] {
    const fnRef = useRef(cursorFn);
    fnRef.current = cursorFn;

    const store = useMemo(() => {
        let docs: T[] | null = null;
        let stop: (() => void) | null = null;
        const listeners = new Set<() => void>();

        const compute = (): T[] => Tracker.nonreactive(() => fnRef.current().fetch());

        return {
            subscribe(onStoreChange: () => void): () => void {
                listeners.add(onStoreChange);
                if (listeners.size === 1) {
                    const cursor = Tracker.nonreactive(() => fnRef.current());
                    const collection = cursor.collectionStore;
                    const onEvents = (): void => {
                        docs = compute();
                        for (const listener of [...listeners]) listener();
                    };
                    collection?.onChange(onEvents);
                    stop = () => collection?.offChange(onEvents);
                }
                return () => {
                    listeners.delete(onStoreChange);
                    if (listeners.size === 0) {
                        stop?.();
                        stop = null;
                        docs = null;
                    }
                };
            },
            getSnapshot(): T[] {
                if (docs === null) docs = compute();
                return docs;
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is the caller's dependency list
    }, deps);

    return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}

/** Reactive Meteor.user(). */
export function useUser(): Document | null {
    return useTracker(() => User.user(), []);
}

/** Reactive Meteor.userId(). */
export function useUserId(): string | null {
    return useTracker(() => User.userId(), []);
}

/** Reactive Meteor.loggingIn(). */
export function useLoggingIn(): boolean {
    return useTracker(() => User.loggingIn(), []);
}

/** Reactive connection status ({connected, status, retryCount, retryTime}). */
export function useConnectionStatus(): { connected: boolean; status: DDPStatus; retryCount: number; retryTime: number | null } {
    return useTracker(
        () => (host ? host.status() : { connected: false, status: 'disconnected' as DDPStatus, retryCount: 0, retryTime: null }),
        [],
        // Status polls into a fresh object; only re-render on real change.
        (prev, next) => EJSON.equals(prev as never, next as never),
    );
}

export { useTracker };
export type { DDPStatus };

// Data is imported for its side-effectful module init ordering (db exists
// before any hook runs); referencing it keeps the import explicit.
void Data;
