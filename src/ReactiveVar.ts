import Tracker from './tracker';

/**
 * Meteor-compatible ReactiveVar: a single reactive value with an optional
 * equality function (default: `===` for primitives, otherwise always-changed,
 * matching Meteor core).
 */
export default class ReactiveVar<T> {
    private value: T;
    private dep = new Tracker.Dependency();

    constructor(
        initialValue: T,
        private readonly equalsFunc?: (a: T, b: T) => boolean,
    ) {
        this.value = initialValue;
    }

    static _isEqual<T>(oldValue: T, newValue: T): boolean {
        if (oldValue !== newValue) return false;
        // Only primitives (and null) are considered equal by identity;
        // objects always count as changed, per Meteor.
        return (
            oldValue === null ||
            ['number', 'boolean', 'string', 'undefined'].includes(typeof oldValue)
        );
    }

    get(): T {
        this.dep.depend();
        return this.value;
    }

    set(newValue: T): void {
        const equals = this.equalsFunc ?? ReactiveVar._isEqual;
        if (equals(this.value, newValue)) return;
        this.value = newValue;
        this.dep.changed();
    }

    toString(): string {
        return `ReactiveVar{${String(this.value)}}`;
    }
}
