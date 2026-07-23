import EJSON from '../lib/ejson';
import MeteorError from '../lib/error';
import { isPlainObject } from '../lib/utils';
import type { Document, Selector } from './types';

/**
 * Mongo-subset selector compiler for the client-side document cache.
 *
 * Design notes:
 * - A dotted path is resolved to a list of "branch" values, expanding arrays
 *   encountered along the path (Mongo semantics: 'a.b' matches if any element
 *   of array `a` has a matching `b`).
 * - A missing field resolves to a single `undefined` branch so `{a: null}`
 *   and `{a: {$exists: false}}` match documents without the field.
 * - Negating operators ($ne, $nin, $not) negate over ALL branches, so
 *   `{tags: {$ne: 'x'}}` does NOT match a doc whose tags array contains 'x'.
 * - Anything outside the supported subset throws loudly.
 */

type ElementPredicate = (value: unknown) => boolean;
type BranchPredicate = (branches: unknown[]) => boolean;

function unsupported(op: string): never {
    throw new MeteorError('unsupported-selector', `Unsupported selector operator: ${op}`);
}

const NUMERIC = /^\d+$/;

/**
 * Resolve a dotted path against a value, returning every reachable branch
 * value. Arrays along the path fan out into their (plain object) elements;
 * numeric path parts also index directly into arrays.
 */
function lookupBranches(value: unknown, parts: readonly string[], index: number): unknown[] {
    if (index === parts.length) {
        return [value];
    }
    const part = parts[index] ?? '';
    if (Array.isArray(value)) {
        const branches: unknown[] = [];
        if (NUMERIC.test(part) && Number(part) < value.length) {
            branches.push(...lookupBranches(value[Number(part)], parts, index + 1));
        }
        for (const element of value) {
            if (isPlainObject(element)) {
                branches.push(...lookupBranches(element, parts, index));
            }
        }
        return branches;
    }
    if (isPlainObject(value)) {
        // A missing key intentionally yields an `undefined` branch (see above).
        return lookupBranches(value[part], parts, index + 1);
    }
    return [];
}

/**
 * Mongo-ish scalar ordering used by $gt/$gte/$lt/$lte: same-type comparison
 * for numbers, strings, and dates only. Cross-type comparisons return
 * undefined and never match.
 */
function typedCompare(a: unknown, b: unknown): number | undefined {
    if (typeof a === 'number' && typeof b === 'number') {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    if (a instanceof Date && b instanceof Date) {
        const ta = a.getTime();
        const tb = b.getTime();
        return ta < tb ? -1 : ta > tb ? 1 : 0;
    }
    return undefined;
}

/** Equality at a single value; `null` selectors also match missing fields. */
function elementEquals(value: unknown, expected: unknown): boolean {
    if (expected === null && (value === null || value === undefined)) {
        return true;
    }
    if (value === undefined) {
        return false;
    }
    return EJSON.equals(value, expected);
}

/**
 * Array-containment equality: `{tags: 'x'}` matches when tags === 'x' OR
 * tags is an array containing 'x' (including whole-array deep equality).
 */
function containsEqual(value: unknown, expected: unknown): boolean {
    if (elementEquals(value, expected)) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.some((element) => elementEquals(element, expected));
    }
    return false;
}

/** Build a regex safe for repeated `.test()` calls (no sticky/global state). */
function safeRegExp(source: string, flags: string): RegExp {
    return new RegExp(source, flags.replace(/[gy]/g, ''));
}

function regexPredicate(regex: RegExp): ElementPredicate {
    const safe = safeRegExp(regex.source, regex.flags);
    const matchOne = (value: unknown): boolean => typeof value === 'string' && safe.test(value);
    return (value) => matchOne(value) || (Array.isArray(value) && value.some(matchOne));
}

function inPredicate(op: string, arg: unknown): ElementPredicate {
    if (!Array.isArray(arg)) {
        throw new MeteorError('invalid-selector', `${op} requires an array`);
    }
    const predicates: ElementPredicate[] = arg.map((item) =>
        item instanceof RegExp ? regexPredicate(item) : (value: unknown) => containsEqual(value, item),
    );
    return (value) => predicates.some((predicate) => predicate(value));
}

function orderingPredicate(op: string, arg: unknown): ElementPredicate {
    const matchOne = (value: unknown): boolean => {
        const comparison = typedCompare(value, arg);
        if (comparison === undefined) {
            return false;
        }
        switch (op) {
            case '$gt':
                return comparison > 0;
            case '$gte':
                return comparison >= 0;
            case '$lt':
                return comparison < 0;
            default:
                return comparison <= 0; // $lte
        }
    };
    return (value) => matchOne(value) || (Array.isArray(value) && value.some(matchOne));
}

function isOperatorDoc(condition: unknown): condition is Record<string, unknown> {
    return isPlainObject(condition) && Object.keys(condition).some((key) => key.startsWith('$'));
}

/** Compile an operator document like `{$gt: 5, $lt: 10}` over path branches. */
function compileOperatorDoc(condition: Record<string, unknown>): BranchPredicate {
    const tests: BranchPredicate[] = [];
    for (const [op, arg] of Object.entries(condition)) {
        switch (op) {
            case '$eq': {
                const predicate: ElementPredicate = (value) => containsEqual(value, arg);
                tests.push((branches) => branches.some(predicate));
                break;
            }
            case '$ne': {
                const predicate: ElementPredicate = (value) => containsEqual(value, arg);
                tests.push((branches) => !branches.some(predicate));
                break;
            }
            case '$in': {
                const predicate = inPredicate('$in', arg);
                tests.push((branches) => branches.some(predicate));
                break;
            }
            case '$nin': {
                const predicate = inPredicate('$nin', arg);
                tests.push((branches) => !branches.some(predicate));
                break;
            }
            case '$gt':
            case '$gte':
            case '$lt':
            case '$lte': {
                const predicate = orderingPredicate(op, arg);
                tests.push((branches) => branches.some(predicate));
                break;
            }
            case '$exists': {
                const wanted = Boolean(arg);
                tests.push((branches) => branches.some((value) => (value !== undefined) === wanted));
                break;
            }
            case '$regex': {
                const flags = typeof condition.$options === 'string'
                    ? condition.$options
                    : arg instanceof RegExp
                        ? arg.flags
                        : '';
                let predicate: ElementPredicate;
                if (arg instanceof RegExp) {
                    predicate = regexPredicate(safeRegExp(arg.source, flags));
                } else if (typeof arg === 'string') {
                    predicate = regexPredicate(safeRegExp(arg, flags));
                } else {
                    throw new MeteorError('invalid-selector', '$regex requires a string or RegExp');
                }
                tests.push((branches) => branches.some(predicate));
                break;
            }
            case '$options': {
                if (!('$regex' in condition)) {
                    throw new MeteorError('invalid-selector', '$options requires $regex');
                }
                break; // consumed by $regex above
            }
            case '$not': {
                let inner: ElementPredicate;
                if (arg instanceof RegExp) {
                    inner = regexPredicate(arg);
                } else if (isOperatorDoc(arg)) {
                    const sub = compileOperatorDoc(arg);
                    inner = (value) => sub([value]);
                } else {
                    throw new MeteorError('invalid-selector', '$not requires an operator expression or RegExp');
                }
                tests.push((branches) => !branches.some(inner));
                break;
            }
            case '$elemMatch': {
                if (!isPlainObject(arg)) {
                    throw new MeteorError('invalid-selector', '$elemMatch requires an object');
                }
                const keys = Object.keys(arg);
                let elementTest: ElementPredicate;
                if (keys.length > 0 && keys.every((key) => key.startsWith('$'))) {
                    // Value form: {scores: {$elemMatch: {$gt: 5, $lt: 9}}}
                    const sub = compileOperatorDoc(arg);
                    elementTest = (element) => sub([element]);
                } else {
                    // Document form: {items: {$elemMatch: {qty: {$gt: 5}}}}
                    const sub = compileMatcher(arg);
                    elementTest = (element) => isPlainObject(element) && sub(element as Document);
                }
                tests.push((branches) =>
                    branches.some((value) => Array.isArray(value) && value.some(elementTest)),
                );
                break;
            }
            case '$size': {
                if (typeof arg !== 'number') {
                    throw new MeteorError('invalid-selector', '$size requires a number');
                }
                tests.push((branches) =>
                    branches.some((value) => Array.isArray(value) && value.length === arg),
                );
                break;
            }
            case '$mod': {
                if (!Array.isArray(arg) || arg.length !== 2) {
                    throw new MeteorError('invalid-selector', '$mod requires [divisor, remainder]');
                }
                const divisor = arg[0];
                const remainder = arg[1];
                if (typeof divisor !== 'number' || typeof remainder !== 'number') {
                    throw new MeteorError('invalid-selector', '$mod requires [divisor, remainder]');
                }
                const matchOne = (value: unknown): boolean =>
                    typeof value === 'number' && value % divisor === remainder;
                tests.push((branches) =>
                    branches.some((value) => matchOne(value) || (Array.isArray(value) && value.some(matchOne))),
                );
                break;
            }
            default:
                unsupported(op);
        }
    }
    return (branches) => tests.every((test) => test(branches));
}

/** Compile the condition for a single field (value, RegExp, or operator doc). */
function compileValueMatcher(condition: unknown): BranchPredicate {
    if (condition instanceof RegExp) {
        const predicate = regexPredicate(condition);
        return (branches) => branches.some(predicate);
    }
    if (isOperatorDoc(condition)) {
        return compileOperatorDoc(condition);
    }
    const predicate: ElementPredicate = (value) => containsEqual(value, condition);
    return (branches) => branches.some(predicate);
}

/**
 * Compile a `$pull`-style condition into a predicate over a single value
 * (one array element). Accepts plain values (deep equality), RegExps, and
 * operator documents like `{$gt: 3}`.
 */
export function compileElementMatcher(condition: unknown): (value: unknown) => boolean {
    const branched = compileValueMatcher(condition);
    return (value) => branched([value]);
}

export function compileMatcher(selector: Selector): (doc: Document) => boolean {
    const tests: Array<(doc: Document) => boolean> = [];
    for (const [key, condition] of Object.entries(selector)) {
        if (key === '$and' || key === '$or' || key === '$nor') {
            if (!Array.isArray(condition) || condition.length === 0) {
                throw new MeteorError('invalid-selector', `${key} requires a non-empty array of selectors`);
            }
            const subs = condition.map((sub) => {
                if (!isPlainObject(sub)) {
                    throw new MeteorError('invalid-selector', `${key} elements must be selector objects`);
                }
                return compileMatcher(sub);
            });
            if (key === '$and') {
                tests.push((doc) => subs.every((sub) => sub(doc)));
            } else if (key === '$or') {
                tests.push((doc) => subs.some((sub) => sub(doc)));
            } else {
                tests.push((doc) => !subs.some((sub) => sub(doc)));
            }
        } else if (key.startsWith('$')) {
            unsupported(key);
        } else {
            const parts = key.split('.');
            const branchTest = compileValueMatcher(condition);
            tests.push((doc) => {
                const branches = lookupBranches(doc, parts, 0);
                return branchTest(branches.length === 0 ? [undefined] : branches);
            });
        }
    }
    return (doc) => tests.every((test) => test(doc));
}
