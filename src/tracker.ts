/**
 * A TypeScript port of Meteor's Tracker — transparent reactive programming.
 *
 * Faithful to the semantics of meteor/packages/tracker/tracker.js:
 * computations rerun when their dependencies change, invalidation callbacks
 * fire immediately (nonreactively) at invalidate time, reruns are batched
 * through a flush queue, and a rerun that throws is logged so the rest of
 * the queue still flushes (first runs rethrow instead).
 *
 * Meteor defers the automatic flush with `Meteor.defer`; on React Native we
 * use `setTimeout(..., 0)`, which has the same "after the current task"
 * behavior. `Tracker.flush()` remains available for synchronous processing.
 */

type ComputationCallback = (computation: Computation) => void;
type AfterFlushCallback = () => void;

interface AutorunOptions {
    /**
     * Called with the error when a rerun (not the first run) throws.
     * Without it the error is logged via `console.error` and flushing
     * continues, matching Meteor.
     */
    onError?: (error: unknown) => void;
}

let nextId = 1;
let active = false;
let currentComputation: Computation | null = null;
let inFlush = false;
let inCompute = false;
let willFlush = false;

const pendingComputations: Computation[] = [];
const afterFlushCallbacks: AfterFlushCallback[] = [];

// Set only by Tracker.autorun so that `new Computation` from user code can
// be rejected, exactly like Meteor's private constructor.
let constructingComputation = false;

function setCurrentComputation(computation: Computation | null): void {
    currentComputation = computation;
    active = computation !== null;
}

function throwOrLog(from: string, error: unknown): void {
    console.error(`Exception from Tracker ${from} function:`, error);
}

/**
 * Schedule a deferred flush unless one is already scheduled or running.
 */
function requireFlush(): void {
    if (!willFlush) {
        willFlush = true;
        setTimeout(() => {
            // A synchronous Tracker.flush() may have drained the queue
            // before this timer fired; runFlush is then a cheap no-op.
            if (!inFlush && !inCompute) {
                runFlush();
            }
        }, 0);
    }
}

function runFlush(): void {
    if (inFlush) {
        throw new Error("Can't call Tracker.flush while flushing");
    }
    if (inCompute) {
        throw new Error("Can't flush inside Tracker.autorun");
    }

    inFlush = true;
    willFlush = true;

    try {
        while (pendingComputations.length > 0 || afterFlushCallbacks.length > 0) {
            // Recompute all pending computations first...
            while (pendingComputations.length > 0) {
                const computation = pendingComputations.shift()!;
                computation._recompute();
                if (computation._needsRecompute()) {
                    // It invalidated itself while recomputing; put it back
                    // at the front so it settles before we move on.
                    pendingComputations.unshift(computation);
                }
            }

            // ...then run afterFlush callbacks one at a time, since each
            // may schedule new recomputations.
            if (afterFlushCallbacks.length > 0) {
                const callback = afterFlushCallbacks.shift()!;
                try {
                    callback();
                } catch (error) {
                    throwOrLog('afterFlush', error);
                }
            }
        }
    } finally {
        willFlush = false;
        inFlush = false;
    }
}

/**
 * A reactive computation: runs a function and reruns it whenever anything
 * it depended on changes. Construct via `Tracker.autorun`.
 */
class Computation {
    /** True during the first run of the computation function. */
    firstRun: boolean;
    /** True once `stop()` has been called; a stopped computation never reruns. */
    stopped: boolean;
    /** True from invalidation until the rerun begins. */
    invalidated: boolean;

    _id: number;

    private _func: ComputationCallback;
    private _onError: ((error: unknown) => void) | undefined;
    private _parent: Computation | null;
    private _onInvalidateCallbacks: ComputationCallback[];
    private _onStopCallbacks: ComputationCallback[];
    private _recomputing: boolean;

    constructor(
        func: ComputationCallback,
        parent: Computation | null = null,
        onError?: (error: unknown) => void,
    ) {
        if (!constructingComputation) {
            throw new Error('Tracker.Computation constructor is private; use Tracker.autorun');
        }
        constructingComputation = false;

        this.stopped = false;
        this.invalidated = false;
        this.firstRun = true;
        this._id = nextId++;
        this._func = func;
        this._onError = onError;
        this._parent = parent;
        this._onInvalidateCallbacks = [];
        this._onStopCallbacks = [];
        this._recomputing = false;

        // Run the function for the first time. If it throws, stop the
        // computation (so partial dependencies are released) and rethrow.
        let errored = true;
        try {
            this._compute();
            errored = false;
        } finally {
            this.firstRun = false;
            if (errored) {
                this.stop();
            }
        }
    }

    /**
     * Register a callback to run when the computation is next invalidated
     * (or stopped, which implies invalidation). Fires immediately if the
     * computation is already invalidated. Callbacks run nonreactively and
     * receive the computation.
     */
    onInvalidate(callback: ComputationCallback): void {
        if (typeof callback !== 'function') {
            throw new Error('onInvalidate requires a function');
        }
        if (this.invalidated) {
            nonreactive(() => callback(this));
        } else {
            this._onInvalidateCallbacks.push(callback);
        }
    }

    /**
     * Register a callback to run when the computation is stopped. Fires
     * immediately (nonreactively) if it is already stopped.
     */
    onStop(callback: ComputationCallback): void {
        if (typeof callback !== 'function') {
            throw new Error('onStop requires a function');
        }
        if (this.stopped) {
            nonreactive(() => callback(this));
        } else {
            this._onStopCallbacks.push(callback);
        }
    }

    /**
     * Mark the computation as needing a rerun. The rerun happens at the
     * next flush (scheduled automatically); onInvalidate callbacks fire
     * right now, nonreactively.
     */
    invalidate(): void {
        if (this.invalidated) {
            return;
        }

        // If we're mid-recompute, the flush loop will notice and rerun us
        // again, so don't enqueue; likewise a stopped computation never
        // reruns.
        if (!this._recomputing && !this.stopped) {
            requireFlush();
            pendingComputations.push(this);
        }

        this.invalidated = true;

        // Callbacks registered while these run see invalidated === true and
        // therefore fire immediately rather than landing in this list.
        const callbacks = this._onInvalidateCallbacks;
        this._onInvalidateCallbacks = [];
        for (const callback of callbacks) {
            nonreactive(() => callback(this));
        }
    }

    /**
     * Permanently stop the computation: it will never rerun, its
     * onInvalidate callbacks fire one last time, then onStop callbacks run.
     */
    stop(): void {
        if (this.stopped) {
            return;
        }
        this.stopped = true;
        this.invalidate();

        const callbacks = this._onStopCallbacks;
        this._onStopCallbacks = [];
        for (const callback of callbacks) {
            nonreactive(() => callback(this));
        }
    }

    _compute(): void {
        this.invalidated = false;

        const previousComputation = currentComputation;
        setCurrentComputation(this);
        const previousInCompute = inCompute;
        inCompute = true;
        try {
            this._func(this);
        } finally {
            setCurrentComputation(previousComputation);
            inCompute = previousInCompute;
        }
    }

    _needsRecompute(): boolean {
        return this.invalidated && !this.stopped;
    }

    _recompute(): void {
        this._recomputing = true;
        try {
            if (this._needsRecompute()) {
                try {
                    this._compute();
                } catch (error) {
                    if (this._onError) {
                        this._onError(error);
                    } else {
                        throwOrLog('recompute', error);
                    }
                }
            }
        } finally {
            this._recomputing = false;
        }
    }
}

/**
 * A source of reactivity: computations `depend()` on it, and `changed()`
 * invalidates them all.
 */
class Dependency {
    private _dependentsById: Map<number, Computation>;

    constructor() {
        this._dependentsById = new Map();
    }

    /**
     * Declare that the current computation (or the one passed in) depends
     * on this Dependency. Returns true if this established a new
     * dependency; false if it already existed or there is no computation.
     * The dependency is dropped automatically when the computation is
     * invalidated, so reruns rebuild their dependencies from scratch.
     */
    depend(computation?: Computation): boolean {
        let target = computation;
        if (!target) {
            if (!active) {
                return false;
            }
            target = currentComputation!;
        }

        const id = target._id;
        if (this._dependentsById.has(id)) {
            return false;
        }
        this._dependentsById.set(id, target);
        target.onInvalidate(() => {
            this._dependentsById.delete(id);
        });
        return true;
    }

    /** Invalidate every dependent computation. */
    changed(): void {
        // Snapshot: each invalidate() removes the dependent from the map.
        for (const computation of Array.from(this._dependentsById.values())) {
            computation.invalidate();
        }
    }

    /** True if any computation currently depends on this Dependency. */
    hasDependents(): boolean {
        return this._dependentsById.size > 0;
    }
}

/**
 * Run a function in a new reactive computation, immediately and then again
 * whenever its dependencies change. If called from inside another
 * computation, the new computation is stopped when the enclosing one is
 * invalidated or stopped (Meteor's nested-autorun linkage).
 */
function autorun(func: ComputationCallback, options: AutorunOptions = {}): Computation {
    if (typeof func !== 'function') {
        throw new Error('Tracker.autorun requires a function argument');
    }

    constructingComputation = true;
    const computation = new Computation(func, currentComputation, options.onError);

    if (active) {
        onInvalidate(() => {
            computation.stop();
        });
    }

    return computation;
}

/**
 * Synchronously rerun all invalidated computations and then run afterFlush
 * callbacks. Throws when called from inside a flush or a computation.
 */
function flush(): void {
    runFlush();
}

/** Run a function with no current computation and return its result. */
function nonreactive<T>(func: () => T): T {
    const previousComputation = currentComputation;
    setCurrentComputation(null);
    try {
        return func();
    } finally {
        setCurrentComputation(previousComputation);
    }
}

/** Shorthand for `Tracker.currentComputation.onInvalidate`; throws if inactive. */
function onInvalidate(callback: ComputationCallback): void {
    if (!active) {
        throw new Error('Tracker.onInvalidate requires a currentComputation');
    }
    currentComputation!.onInvalidate(callback);
}

/** Schedule a function to run after the current or next flush completes. */
function afterFlush(callback: AfterFlushCallback): void {
    if (typeof callback !== 'function') {
        throw new Error('Tracker.afterFlush requires a function');
    }
    afterFlushCallbacks.push(callback);
    requireFlush();
}

const Tracker = {
    Computation,
    Dependency,

    /** True if there is a current computation (code is running reactively). */
    get active(): boolean {
        return active;
    },

    /** The computation currently being built or rerun, or null. */
    get currentComputation(): Computation | null {
        return currentComputation;
    },

    /** True while Tracker.flush (or the automatic flush) is running. */
    get inFlush(): boolean {
        return inFlush;
    },

    autorun,
    flush,
    nonreactive,
    onInvalidate,
    afterFlush,
};

export { Computation, Dependency };
export default Tracker;
