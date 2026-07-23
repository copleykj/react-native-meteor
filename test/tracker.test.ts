import { describe, it, expect, vi } from 'vitest';
import Tracker, { Computation, Dependency } from '../src/tracker';

describe('Tracker', () => {
    describe('autorun basics', () => {
        it('runs the function immediately and returns the computation', () => {
            let runs = 0;
            let received: Computation | undefined;
            const computation = Tracker.autorun((c) => {
                runs++;
                received = c;
            });
            expect(runs).toBe(1);
            expect(received).toBe(computation);
            computation.stop();
        });

        it('reports firstRun true on the first run and false on reruns', () => {
            const dep = new Tracker.Dependency();
            const firstRuns: boolean[] = [];
            const computation = Tracker.autorun((c) => {
                dep.depend();
                firstRuns.push(c.firstRun);
            });
            dep.changed();
            Tracker.flush();
            expect(firstRuns).toEqual([true, false]);
            computation.stop();
        });

        it('throws when given a non-function', () => {
            expect(() => Tracker.autorun(undefined as unknown as () => void)).toThrow(
                /requires a function/,
            );
        });

        it('sets active and currentComputation inside, clears them outside', () => {
            expect(Tracker.active).toBe(false);
            expect(Tracker.currentComputation).toBe(null);

            let insideActive: boolean | undefined;
            let insideCurrent: Computation | null = null;
            const computation = Tracker.autorun(() => {
                insideActive = Tracker.active;
                insideCurrent = Tracker.currentComputation;
            });

            expect(insideActive).toBe(true);
            expect(insideCurrent).toBe(computation);
            expect(Tracker.active).toBe(false);
            expect(Tracker.currentComputation).toBe(null);
            computation.stop();
        });

        it('rethrows a first-run error after stopping the computation', () => {
            let captured: Computation | undefined;
            expect(() =>
                Tracker.autorun((c) => {
                    captured = c;
                    throw new Error('first-run failure');
                }),
            ).toThrow('first-run failure');
            expect(captured).toBeDefined();
            expect(captured!.stopped).toBe(true);
        });
    });

    describe('Computation constructor privacy', () => {
        it('cannot be constructed directly', () => {
            expect(() => new Computation(() => {})).toThrow(/private/);
        });
    });

    describe('Dependency', () => {
        it('depend/changed triggers a rerun via flush', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const computation = Tracker.autorun(() => {
                dep.depend();
                runs++;
            });
            expect(runs).toBe(1);
            dep.changed();
            expect(runs).toBe(1); // rerun is deferred until flush
            Tracker.flush();
            expect(runs).toBe(2);
            computation.stop();
        });

        it('depend returns true for a new dependency, false for a repeat', () => {
            const dep = new Tracker.Dependency();
            let first: boolean | undefined;
            let second: boolean | undefined;
            const computation = Tracker.autorun(() => {
                first = dep.depend();
                second = dep.depend();
            });
            expect(first).toBe(true);
            expect(second).toBe(false);
            computation.stop();
        });

        it('depend returns false outside a computation', () => {
            const dep = new Tracker.Dependency();
            expect(dep.depend()).toBe(false);
            expect(dep.hasDependents()).toBe(false);
        });

        it('depend accepts an explicit computation argument', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const computation = Tracker.autorun(() => {
                runs++;
            });
            expect(dep.depend(computation)).toBe(true);
            expect(dep.hasDependents()).toBe(true);
            dep.changed();
            Tracker.flush();
            expect(runs).toBe(2);
            computation.stop();
        });

        it('changed() with no dependents is a no-op', () => {
            const dep = new Tracker.Dependency();
            expect(dep.hasDependents()).toBe(false);
            expect(() => dep.changed()).not.toThrow();
        });

        it('hasDependents reflects registration and removal', () => {
            const dep = new Tracker.Dependency();
            const computation = Tracker.autorun(() => {
                dep.depend();
            });
            expect(dep.hasDependents()).toBe(true);
            computation.stop();
            expect(dep.hasDependents()).toBe(false);
        });

        it('drops dependencies on invalidate so reruns rebuild them', () => {
            const cond = new Tracker.Dependency();
            const extra = new Tracker.Dependency();
            let useExtra = true;
            let runs = 0;
            const computation = Tracker.autorun(() => {
                runs++;
                cond.depend();
                if (useExtra) {
                    extra.depend();
                }
            });
            expect(extra.hasDependents()).toBe(true);

            useExtra = false;
            cond.changed();
            Tracker.flush();
            expect(runs).toBe(2);
            expect(extra.hasDependents()).toBe(false);

            extra.changed();
            Tracker.flush();
            expect(runs).toBe(2); // no longer depended on
            computation.stop();
        });
    });

    describe('stop and callbacks', () => {
        it('stop() prevents any further reruns', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const computation = Tracker.autorun(() => {
                dep.depend();
                runs++;
            });
            computation.stop();
            expect(computation.stopped).toBe(true);
            dep.changed();
            Tracker.flush();
            expect(runs).toBe(1);
        });

        it('stop() after invalidation cancels the pending rerun', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const computation = Tracker.autorun(() => {
                dep.depend();
                runs++;
            });
            dep.changed();
            computation.stop();
            Tracker.flush();
            expect(runs).toBe(1);
        });

        it('onInvalidate fires immediately at invalidate time, nonreactively', () => {
            const dep = new Tracker.Dependency();
            const events: Array<{ active: boolean; invalidated: boolean }> = [];
            const computation = Tracker.autorun(() => {
                dep.depend();
            });
            computation.onInvalidate((c) => {
                events.push({ active: Tracker.active, invalidated: c.invalidated });
            });

            dep.changed(); // no flush yet — callback must fire now
            expect(events).toEqual([{ active: false, invalidated: true }]);
            computation.stop();
        });

        it('onInvalidate callbacks fire once per invalidation cycle', () => {
            const computation = Tracker.autorun(() => {});
            let calls = 0;
            computation.onInvalidate(() => {
                calls++;
            });
            computation.invalidate();
            computation.invalidate(); // already invalidated: no second firing
            expect(calls).toBe(1);
            computation.stop();
        });

        it('onInvalidate registered while invalidated fires immediately', () => {
            const computation = Tracker.autorun(() => {});
            computation.invalidate();
            let called = false;
            computation.onInvalidate(() => {
                called = true;
            });
            expect(called).toBe(true);
            computation.stop();
        });

        it('onInvalidate fires on stop too', () => {
            const computation = Tracker.autorun(() => {});
            let invalidateCalls = 0;
            computation.onInvalidate(() => {
                invalidateCalls++;
            });
            computation.stop();
            expect(invalidateCalls).toBe(1);
        });

        it('onStop fires on stop, and immediately if already stopped', () => {
            const order: string[] = [];
            const computation = Tracker.autorun(() => {});
            computation.onInvalidate(() => order.push('invalidate'));
            computation.onStop(() => order.push('stop'));
            computation.stop();
            expect(order).toEqual(['invalidate', 'stop']);

            let lateCalled = false;
            computation.onStop(() => {
                lateCalled = true;
            });
            expect(lateCalled).toBe(true);
        });

        it('Tracker.onInvalidate throws outside a computation and works inside', () => {
            expect(() => Tracker.onInvalidate(() => {})).toThrow(/currentComputation/);

            let called = false;
            const computation = Tracker.autorun(() => {
                Tracker.onInvalidate(() => {
                    called = true;
                });
            });
            expect(called).toBe(false);
            computation.stop();
            expect(called).toBe(true);
        });
    });

    describe('nested autoruns', () => {
        it('stops the inner computation when the enclosing one is invalidated', () => {
            const outerDep = new Tracker.Dependency();
            const innerDep = new Tracker.Dependency();
            let outerRuns = 0;
            let innerRuns = 0;
            let innerStops = 0;

            const outer = Tracker.autorun(() => {
                outerDep.depend();
                outerRuns++;
                Tracker.autorun((c) => {
                    innerDep.depend();
                    innerRuns++;
                    if (c.firstRun) {
                        // Only once: the body reruns on the same computation,
                        // and onStop registered per-run would stack up.
                        c.onStop(() => {
                            innerStops++;
                        });
                    }
                });
            });

            expect(outerRuns).toBe(1);
            expect(innerRuns).toBe(1);
            expect(innerStops).toBe(0);

            outerDep.changed();
            Tracker.flush();
            expect(outerRuns).toBe(2);
            expect(innerRuns).toBe(2); // fresh inner from the outer rerun
            expect(innerStops).toBe(1); // original inner was stopped

            // The stopped first inner no longer reacts; the second one does.
            innerDep.changed();
            Tracker.flush();
            expect(innerRuns).toBe(3);

            outer.stop();
            expect(innerStops).toBe(2); // current inner stopped with its parent
            innerDep.changed();
            Tracker.flush();
            expect(innerRuns).toBe(3);
        });

        it('does not stop a computation created outside any parent', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const standalone = Tracker.autorun(() => {
                dep.depend();
                runs++;
            });
            // No parent: invalidating unrelated computations never stops it.
            dep.changed();
            Tracker.flush();
            expect(runs).toBe(2);
            expect(standalone.stopped).toBe(false);
            standalone.stop();
        });
    });

    describe('nonreactive', () => {
        it('does not create dependencies inside an autorun', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const computation = Tracker.autorun(() => {
                runs++;
                Tracker.nonreactive(() => {
                    dep.depend();
                });
            });
            expect(dep.hasDependents()).toBe(false);
            dep.changed();
            Tracker.flush();
            expect(runs).toBe(1);
            computation.stop();
        });

        it('returns the result and restores the current computation', () => {
            let restored: Computation | null = null;
            const computation = Tracker.autorun(() => {
                const result = Tracker.nonreactive(() => {
                    expect(Tracker.active).toBe(false);
                    expect(Tracker.currentComputation).toBe(null);
                    return 42;
                });
                expect(result).toBe(42);
                restored = Tracker.currentComputation;
            });
            expect(restored).toBe(computation);
            computation.stop();
        });
    });

    describe('flush and afterFlush', () => {
        it('runs afterFlush callbacks after pending recomputations', () => {
            const dep = new Tracker.Dependency();
            const order: string[] = [];
            const computation = Tracker.autorun((c) => {
                dep.depend();
                if (!c.firstRun) {
                    order.push('rerun');
                }
            });
            Tracker.afterFlush(() => {
                order.push('afterFlush');
            });
            dep.changed();
            Tracker.flush();
            expect(order).toEqual(['rerun', 'afterFlush']);
            computation.stop();
        });

        it('reports inFlush inside afterFlush and false outside', () => {
            let sawInFlush: boolean | undefined;
            Tracker.afterFlush(() => {
                sawInFlush = Tracker.inFlush;
            });
            expect(Tracker.inFlush).toBe(false);
            Tracker.flush();
            expect(sawInFlush).toBe(true);
            expect(Tracker.inFlush).toBe(false);
        });

        it('throws when flush is called from inside a computation', () => {
            const computation = Tracker.autorun(() => {
                expect(() => Tracker.flush()).toThrow(/inside Tracker\.autorun/);
            });
            computation.stop();
        });

        it('throws when flush is called from inside a flush', () => {
            let error: Error | undefined;
            Tracker.afterFlush(() => {
                try {
                    Tracker.flush();
                } catch (caught) {
                    error = caught as Error;
                }
            });
            Tracker.flush();
            expect(error).toBeDefined();
            expect(error!.message).toMatch(/while flushing/);
        });

        it('flushes automatically via a deferred setTimeout', () => {
            vi.useFakeTimers();
            try {
                const dep = new Tracker.Dependency();
                let runs = 0;
                const computation = Tracker.autorun(() => {
                    dep.depend();
                    runs++;
                });
                dep.changed();
                expect(runs).toBe(1);
                vi.runAllTimers();
                expect(runs).toBe(2);
                computation.stop();
            } finally {
                vi.useRealTimers();
            }
        });

        it('settles a computation that invalidates itself during rerun', () => {
            const dep = new Tracker.Dependency();
            let runs = 0;
            const computation = Tracker.autorun((c) => {
                dep.depend();
                runs++;
                if (!c.firstRun && runs < 4) {
                    c.invalidate();
                }
            });
            dep.changed();
            Tracker.flush();
            expect(runs).toBe(4);
            expect(computation.invalidated).toBe(false);
            computation.stop();
        });
    });

    describe('error handling during reruns', () => {
        it('logs a throwing rerun and still reruns other computations', () => {
            const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
            try {
                const dep = new Tracker.Dependency();
                let healthyRuns = 0;
                const broken = Tracker.autorun((c) => {
                    dep.depend();
                    if (!c.firstRun) {
                        throw new Error('rerun failure');
                    }
                });
                const healthy = Tracker.autorun(() => {
                    dep.depend();
                    healthyRuns++;
                });

                dep.changed();
                expect(() => Tracker.flush()).not.toThrow();
                expect(healthyRuns).toBe(2);
                expect(spy).toHaveBeenCalledWith(
                    expect.stringContaining('recompute'),
                    expect.objectContaining({ message: 'rerun failure' }),
                );
                broken.stop();
                healthy.stop();
            } finally {
                spy.mockRestore();
            }
        });

        it('routes rerun errors to the onError option when provided', () => {
            const dep = new Tracker.Dependency();
            const errors: unknown[] = [];
            const computation = Tracker.autorun(
                (c) => {
                    dep.depend();
                    if (!c.firstRun) {
                        throw new Error('handled failure');
                    }
                },
                {
                    onError: (error) => {
                        errors.push(error);
                    },
                },
            );
            dep.changed();
            Tracker.flush();
            expect(errors).toHaveLength(1);
            expect((errors[0] as Error).message).toBe('handled failure');
            computation.stop();
        });

        it('logs a throwing afterFlush callback and keeps flushing', () => {
            const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
            try {
                const order: string[] = [];
                Tracker.afterFlush(() => {
                    throw new Error('afterFlush failure');
                });
                Tracker.afterFlush(() => {
                    order.push('second');
                });
                expect(() => Tracker.flush()).not.toThrow();
                expect(order).toEqual(['second']);
                expect(spy).toHaveBeenCalledWith(
                    expect.stringContaining('afterFlush'),
                    expect.objectContaining({ message: 'afterFlush failure' }),
                );
            } finally {
                spy.mockRestore();
            }
        });
    });

    describe('named exports', () => {
        it('exposes the same classes as the Tracker object', () => {
            expect(Computation).toBe(Tracker.Computation);
            expect(Dependency).toBe(Tracker.Dependency);
        });
    });
});
