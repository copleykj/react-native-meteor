import EJSON from './lib/ejson';
import Tracker from './tracker';
import MongoID from './lib/mongo-id';
import Data from './Data';

type Scalar = string | number | boolean | undefined | null | Date | InstanceType<typeof MongoID.ObjectID>;

const stringify = (value: unknown): string => {
    if (value === undefined) return 'undefined';
    return EJSON.stringify(value);
};

const parse = (serialized: string | undefined): unknown => {
    if (serialized === undefined || serialized === 'undefined') return undefined;
    return EJSON.parse(serialized);
};

function isScalar(value: unknown): value is Scalar {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value instanceof Date ||
        value instanceof MongoID.ObjectID ||
        value === null
    );
}

/**
 * Meteor-compatible ReactiveDict with per-key dependency tracking: a
 * `set('a', …)` only invalidates computations that read key `a` (or that
 * called `all()`), not every tracker in the app.
 *
 * Values are EJSON-serialized like Meteor's, so only EJSON-able values are
 * storable and get() returns a clone, never a shared reference.
 */
export default class ReactiveDict {
    private keys: Record<string, string> = {};
    private keyDeps: Record<string, InstanceType<typeof Tracker.Dependency>> = {};
    private keyValueDeps: Record<string, Map<string, InstanceType<typeof Tracker.Dependency>>> = {};
    private allDeps = new Tracker.Dependency();

    constructor(dictName?: string | Record<string, unknown>) {
        if (typeof dictName === 'object' && dictName !== null) {
            for (const key of Object.keys(dictName)) {
                this.keys[key] = stringify(dictName[key]);
            }
        }
    }

    set(keyOrObject: string | Record<string, unknown>, value?: unknown): void {
        if (typeof keyOrObject === 'object' && keyOrObject !== null && value === undefined) {
            this._setObject(keyOrObject);
            return;
        }
        const key = keyOrObject as string;
        const serialized = stringify(value);
        const oldSerialized = Object.prototype.hasOwnProperty.call(this.keys, key)
            ? this.keys[key]!
            : 'undefined';
        if (serialized === oldSerialized) return;

        this.keys[key] = serialized;
        this.changed(key, oldSerialized, serialized);
    }

    setDefault(key: string, value: unknown): void {
        if (!Object.prototype.hasOwnProperty.call(this.keys, key)) {
            this.set(key, value);
        }
    }

    get(key: string): unknown {
        this.dependOnKey(key);
        return parse(this.keys[key]);
    }

    /**
     * Reactive scalar equality check. Depends on a per-(key,value) dependency
     * so a computation using `equals` only re-runs when the answer flips —
     * Meteor's Session.equals optimization.
     */
    equals(key: string, value: unknown): boolean {
        if (!isScalar(value)) {
            throw new Error('ReactiveDict.equals: value must be scalar');
        }
        const serialized = stringify(value);
        if (Tracker.active) {
            let valueDeps = this.keyValueDeps[key];
            if (!valueDeps) {
                valueDeps = new Map();
                this.keyValueDeps[key] = valueDeps;
            }
            let dep = valueDeps.get(serialized);
            if (!dep) {
                dep = new Tracker.Dependency();
                valueDeps.set(serialized, dep);
            }
            dep.depend();
        }

        const oldValue = Object.prototype.hasOwnProperty.call(this.keys, key)
            ? parse(this.keys[key])
            : undefined;
        return EJSON.equals(oldValue as never, value as never);
    }

    delete(key: string): boolean {
        if (!Object.prototype.hasOwnProperty.call(this.keys, key)) return false;
        const oldSerialized = this.keys[key]!;
        delete this.keys[key];
        this.changed(key, oldSerialized, 'undefined');
        return true;
    }

    clear(): void {
        const oldKeys = this.keys;
        this.keys = {};
        for (const key of Object.keys(oldKeys)) {
            this.changed(key, oldKeys[key]!, 'undefined');
        }
    }

    /** Reactive snapshot of the whole dict. */
    all(): Record<string, unknown> {
        this.allDeps.depend();
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(this.keys)) {
            result[key] = parse(this.keys[key]);
        }
        return result;
    }

    private _setObject(object: Record<string, unknown>): void {
        for (const key of Object.keys(object)) {
            this.set(key, object[key]);
        }
    }

    private dependOnKey(key: string): void {
        if (!Tracker.active) return;
        let dep = this.keyDeps[key];
        if (!dep) {
            dep = new Tracker.Dependency();
            this.keyDeps[key] = dep;
        }
        dep.depend();
    }

    private changed(key: string, oldSerialized: string, newSerialized: string): void {
        this.keyDeps[key]?.changed();
        const valueDeps = this.keyValueDeps[key];
        if (valueDeps) {
            valueDeps.get(oldSerialized)?.changed();
            valueDeps.get(newSerialized)?.changed();
        }
        this.allDeps.changed();
        // Legacy coarse path: v3's useTracker re-runs on this. Removed when
        // the hooks move to per-dependency subscriptions in Phase 6.
        Data.notify('change');
    }
}
