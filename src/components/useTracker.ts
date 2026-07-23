import { useMemo, useRef, useSyncExternalStore, type DependencyList } from 'react';
import Tracker, { type Computation } from '../tracker';
import Data from '../Data';

/**
 * Run a reactive function and re-render when its result changes.
 *
 * Built on useSyncExternalStore (correct under React 18/19 concurrent
 * rendering). Subscriptions happen in the store's subscribe — never during
 * render — fixing v3's per-render Data.onChange listener leak.
 *
 * Reactivity sources: Tracker dependencies read inside `trackerFn`
 * (ReactiveDict/ReactiveVar/sub.ready()/Meteor.user()) plus the coarse data
 * layer change events (collection writes, connection status). `skipUpdate`
 * can veto re-renders, e.g. `(prev, next) => EJSON.equals(prev, next)`.
 */
export default function useTracker<T>(
    trackerFn: () => T,
    deps: DependencyList = [],
    skipUpdate?: (prev: T, next: T) => boolean,
): T {
    // Always call the latest render's closure without invalidating the store.
    const fnRef = useRef(trackerFn);
    fnRef.current = trackerFn;
    const skipRef = useRef(skipUpdate);
    skipRef.current = skipUpdate;

    const store = useMemo(() => {
        let value: T;
        let hasValue = false;
        let computation: Computation | null = null;
        const listeners = new Set<() => void>();

        const evaluate = (): void => {
            computation?.stop();
            Tracker.nonreactive(() => {
                computation = Tracker.autorun((currentComputation) => {
                    if (currentComputation.firstRun) {
                        value = fnRef.current();
                        hasValue = true;
                    } else {
                        // A Tracker dependency changed: recompute with a
                        // fresh autorun so the dependency set is re-collected.
                        notify();
                    }
                });
            });
        };

        const notify = (): void => {
            const previous = value;
            evaluate();
            if (hasValue && skipRef.current && skipRef.current(previous, value)) {
                value = previous; // keep referential stability for React
                return;
            }
            for (const listener of [...listeners]) listener();
        };

        const dataChanged = (): void => notify();

        return {
            subscribe(onStoreChange: () => void): () => void {
                listeners.add(onStoreChange);
                if (listeners.size === 1) {
                    Data.onChange(dataChanged);
                }
                return () => {
                    listeners.delete(onStoreChange);
                    if (listeners.size === 0) {
                        Data.offChange(dataChanged);
                        computation?.stop();
                        computation = null;
                        hasValue = false;
                    }
                };
            },
            getSnapshot(): T {
                if (!hasValue) evaluate();
                return value;
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is the caller's dependency list
    }, deps);

    return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
