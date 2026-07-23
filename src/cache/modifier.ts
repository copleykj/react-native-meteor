import EJSON from '../lib/ejson';
import MeteorError from '../lib/error';
import { isPlainObject } from '../lib/utils';
import { compileElementMatcher, compileMatcher } from './matcher';
import { compareValues } from './sorter';
import type { Document, Modifier, Selector } from './types';

/**
 * Mongo-subset update engine for the client-side document cache. Pure: the
 * input document is never mutated; a modified clone is returned.
 *
 * Supported operators: $set $unset $inc $mul $push ($each) $pull $pullAll
 * $addToSet ($each) $pop $min $max $rename $currentDate — with dotted paths,
 * creating intermediate containers per Mongo semantics ($set/$inc/...). A
 * modifier with no $-keys is a whole-document replacement that keeps the
 * original _id. Anything else throws loudly.
 */

type Container = Record<string, unknown> | unknown[];
type Target = { parent: Container; key: string };

const NUMERIC = /^\d+$/;

function invalid(reason: string): never {
    throw new MeteorError('invalid-modifier', reason);
}

/** Missing intermediates become arrays for numeric path parts, else objects. */
function makeContainer(nextPart: string): Container {
    return NUMERIC.test(nextPart) ? [] : {};
}

/**
 * Walk to the parent container of the last path part. With `create`, missing
 * intermediates are created (arrays are padded with nulls to reach numeric
 * indexes, as Mongo does); without it, a missing path returns undefined.
 */
function resolveTarget(root: Record<string, unknown>, parts: readonly string[], create: boolean): Target | undefined {
    let current: Container = root;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i] ?? '';
        let next: unknown;
        if (Array.isArray(current)) {
            if (!NUMERIC.test(part)) {
                invalid(`Cannot use non-numeric field name '${part}' to traverse an array`);
            }
            const index = Number(part);
            while (create && current.length < index + 1) {
                current.push(null);
            }
            next = current[index];
        } else {
            next = current[part];
        }
        if (next === undefined || next === null) {
            if (!create) {
                return undefined;
            }
            const made = makeContainer(parts[i + 1] ?? '');
            if (Array.isArray(current)) {
                current[Number(part)] = made;
            } else {
                current[part] = made;
            }
            next = made;
        } else if (!Array.isArray(next) && !isPlainObject(next)) {
            if (!create) {
                return undefined;
            }
            invalid(`Cannot create field '${parts[i + 1] ?? ''}' in non-container value at '${part}'`);
        }
        current = next as Container;
    }
    return { parent: current, key: parts[parts.length - 1] ?? '' };
}

function readTarget(target: Target): unknown {
    if (Array.isArray(target.parent)) {
        return NUMERIC.test(target.key) ? target.parent[Number(target.key)] : undefined;
    }
    return target.parent[target.key];
}

function writeTarget(target: Target, value: unknown): void {
    if (Array.isArray(target.parent)) {
        if (!NUMERIC.test(target.key)) {
            invalid(`Cannot use non-numeric field name '${target.key}' to index an array`);
        }
        const index = Number(target.key);
        while (target.parent.length < index) {
            target.parent.push(null);
        }
        target.parent[index] = value;
    } else {
        target.parent[target.key] = value;
    }
}

/** Extract the items for $push/$addToSet, honouring the $each form. */
function itemsFor(op: string, arg: unknown): unknown[] {
    if (isPlainObject(arg) && '$each' in arg) {
        for (const key of Object.keys(arg)) {
            if (key !== '$each') {
                throw new MeteorError('unsupported-modifier', `Unsupported modifier operator: ${op}.${key}`);
            }
        }
        const each = arg.$each;
        if (!Array.isArray(each)) {
            invalid(`${op} $each requires an array`);
        }
        return each;
    }
    return [arg];
}

/** Build the element predicate for $pull's value/condition argument. */
function pullPredicate(arg: unknown): (element: unknown) => boolean {
    if (arg instanceof RegExp) {
        return compileElementMatcher(arg);
    }
    if (isPlainObject(arg)) {
        if (Object.keys(arg).some((key) => key.startsWith('$'))) {
            // Operator condition, e.g. {$gt: 3} — matched against each element.
            return compileElementMatcher(arg);
        }
        // Document condition, e.g. {score: 8} — partial match on element docs.
        const matcher = compileMatcher(arg as Selector);
        return (element) => isPlainObject(element) && matcher(element as Document);
    }
    return (element) => EJSON.equals(element, arg);
}

function applyOp(result: Record<string, unknown>, op: string, path: string, arg: unknown): void {
    const parts = path.split('.');
    if (parts[0] === '_id') {
        invalid('Cannot modify the _id field');
    }
    switch (op) {
        case '$set': {
            const target = resolveTarget(result, parts, true) as Target;
            writeTarget(target, EJSON.clone(arg));
            break;
        }
        case '$unset': {
            const target = resolveTarget(result, parts, false);
            if (target) {
                if (Array.isArray(target.parent)) {
                    // Mongo leaves a null hole rather than reindexing.
                    if (NUMERIC.test(target.key) && Number(target.key) < target.parent.length) {
                        target.parent[Number(target.key)] = null;
                    }
                } else {
                    delete target.parent[target.key];
                }
            }
            break;
        }
        case '$inc':
        case '$mul': {
            if (typeof arg !== 'number') {
                invalid(`${op} requires a numeric argument`);
            }
            const target = resolveTarget(result, parts, true) as Target;
            const current = readTarget(target);
            if (current === undefined) {
                // Missing fields start at 0; $inc adds, $mul keeps 0.
                writeTarget(target, op === '$inc' ? arg : 0);
            } else if (typeof current !== 'number') {
                invalid(`Cannot apply ${op} to a non-numeric value at '${path}'`);
            } else {
                writeTarget(target, op === '$inc' ? current + arg : current * arg);
            }
            break;
        }
        case '$min':
        case '$max': {
            const target = resolveTarget(result, parts, true) as Target;
            const current = readTarget(target);
            if (current === undefined) {
                writeTarget(target, EJSON.clone(arg));
            } else {
                const comparison = compareValues(arg, current);
                if (op === '$min' ? comparison < 0 : comparison > 0) {
                    writeTarget(target, EJSON.clone(arg));
                }
            }
            break;
        }
        case '$push': {
            const items = itemsFor('$push', arg);
            const target = resolveTarget(result, parts, true) as Target;
            const current = readTarget(target);
            if (current === undefined) {
                writeTarget(target, items.map((item) => EJSON.clone(item)));
            } else if (!Array.isArray(current)) {
                invalid(`Cannot apply $push to a non-array value at '${path}'`);
            } else {
                current.push(...items.map((item) => EJSON.clone(item)));
            }
            break;
        }
        case '$addToSet': {
            const items = itemsFor('$addToSet', arg);
            const target = resolveTarget(result, parts, true) as Target;
            const current = readTarget(target);
            if (current === undefined) {
                const set: unknown[] = [];
                for (const item of items) {
                    if (!set.some((element) => EJSON.equals(element, item))) {
                        set.push(EJSON.clone(item));
                    }
                }
                writeTarget(target, set);
            } else if (!Array.isArray(current)) {
                invalid(`Cannot apply $addToSet to a non-array value at '${path}'`);
            } else {
                for (const item of items) {
                    if (!current.some((element) => EJSON.equals(element, item))) {
                        current.push(EJSON.clone(item));
                    }
                }
            }
            break;
        }
        case '$pop': {
            if (arg !== 1 && arg !== -1) {
                invalid('$pop requires 1 or -1');
            }
            const target = resolveTarget(result, parts, false);
            if (!target) {
                break;
            }
            const current = readTarget(target);
            if (current === undefined) {
                break;
            }
            if (!Array.isArray(current)) {
                invalid(`Cannot apply $pop to a non-array value at '${path}'`);
            }
            if (arg === 1) {
                current.pop();
            } else {
                current.shift();
            }
            break;
        }
        case '$pull': {
            const target = resolveTarget(result, parts, false);
            if (!target) {
                break;
            }
            const current = readTarget(target);
            if (current === undefined) {
                break;
            }
            if (!Array.isArray(current)) {
                invalid(`Cannot apply $pull to a non-array value at '${path}'`);
            }
            const predicate = pullPredicate(arg);
            writeTarget(target, current.filter((element) => !predicate(element)));
            break;
        }
        case '$pullAll': {
            if (!Array.isArray(arg)) {
                invalid('$pullAll requires an array argument');
            }
            const target = resolveTarget(result, parts, false);
            if (!target) {
                break;
            }
            const current = readTarget(target);
            if (current === undefined) {
                break;
            }
            if (!Array.isArray(current)) {
                invalid(`Cannot apply $pullAll to a non-array value at '${path}'`);
            }
            writeTarget(
                target,
                current.filter((element) => !arg.some((item) => EJSON.equals(element, item))),
            );
            break;
        }
        case '$rename': {
            if (typeof arg !== 'string' || arg.length === 0) {
                invalid('$rename requires a non-empty string argument');
            }
            const destParts = arg.split('.');
            if (destParts[0] === '_id') {
                invalid('Cannot modify the _id field');
            }
            if (arg === path) {
                invalid('$rename source and destination must differ');
            }
            const source = resolveTarget(result, parts, false);
            if (!source || Array.isArray(source.parent)) {
                // Missing source is a no-op; renaming through arrays is not
                // supported (Mongo errors on array elements too).
                if (source) {
                    invalid('$rename does not work on array elements');
                }
                break;
            }
            if (!(source.key in source.parent)) {
                break;
            }
            const value = source.parent[source.key];
            delete source.parent[source.key];
            const dest = resolveTarget(result, destParts, true) as Target;
            if (Array.isArray(dest.parent)) {
                invalid('$rename does not work on array elements');
            }
            dest.parent[dest.key] = value;
            break;
        }
        case '$currentDate': {
            const wantsDate =
                arg === true ||
                (isPlainObject(arg) && (arg.$type === 'date' || arg.$type === 'timestamp'));
            if (!wantsDate) {
                invalid("$currentDate requires true or {$type: 'date' | 'timestamp'}");
            }
            // Timestamps are consciously simplified to plain Dates.
            const target = resolveTarget(result, parts, true) as Target;
            writeTarget(target, new Date());
            break;
        }
        default:
            throw new MeteorError('unsupported-modifier', `Unsupported modifier operator: ${op}`);
    }
}

export function applyModifier(doc: Document, modifier: Modifier): Document {
    const keys = Object.keys(modifier);
    const opKeys = keys.filter((key) => key.startsWith('$'));
    if (opKeys.length === 0) {
        // Whole-document replacement: keep the original _id.
        const replacement = EJSON.clone(modifier) as Record<string, unknown>;
        if ('_id' in replacement && !EJSON.equals(replacement._id, doc._id)) {
            invalid('The _id field cannot be changed by a replacement');
        }
        return { ...replacement, _id: doc._id };
    }
    if (opKeys.length !== keys.length) {
        invalid('Modifier cannot mix $-operators and plain fields');
    }
    const result = EJSON.clone(doc) as Record<string, unknown>;
    for (const [op, fields] of Object.entries(modifier)) {
        if (!isPlainObject(fields)) {
            invalid(`${op} requires an object of field/value pairs`);
        }
        for (const [path, arg] of Object.entries(fields)) {
            applyOp(result, op, path, arg);
        }
    }
    return result as Document;
}
