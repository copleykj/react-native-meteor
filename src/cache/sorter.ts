import EJSON from '../lib/ejson';
import MeteorError from '../lib/error';
import { isPlainObject } from '../lib/utils';
import type { Document, SortSpec } from './types';

/**
 * Mongo-subset sort compiler for the client-side document cache.
 *
 * Type-bracketed ordering (roughly BSON order). Chosen brackets, ascending:
 *
 *   0. undefined / null
 *   1. numbers
 *   2. strings
 *   3. plain objects (and other non-array, non-date object values)
 *   4. arrays
 *   5. booleans (false < true)
 *   6. dates (by epoch time)
 *
 * Within a bracket: numbers numerically (NaN ties with everything — cache
 * documents should not contain NaN), strings lexicographically by code unit,
 * dates by getTime(), booleans false-first. Objects and arrays compare by
 * their canonical EJSON serialization — deterministic and stable, though not
 * Mongo's element-wise BSON comparison (a conscious simplification).
 */

const NUMERIC = /^\d+$/;

function typeOrder(value: unknown): number {
    if (value === undefined || value === null) {
        return 0;
    }
    if (typeof value === 'number') {
        return 1;
    }
    if (typeof value === 'string') {
        return 2;
    }
    if (typeof value === 'boolean') {
        return 5;
    }
    if (value instanceof Date) {
        return 6;
    }
    if (Array.isArray(value)) {
        return 4;
    }
    return 3; // plain objects and anything else object-like
}

/**
 * Total order over cache values using the bracketing documented above.
 * Also used by the modifier's $min/$max.
 */
export function compareValues(a: unknown, b: unknown): number {
    const ta = typeOrder(a);
    const tb = typeOrder(b);
    if (ta !== tb) {
        return ta - tb;
    }
    switch (ta) {
        case 0:
            return 0;
        case 1: {
            const na = a as number;
            const nb = b as number;
            return na < nb ? -1 : na > nb ? 1 : 0;
        }
        case 2: {
            const sa = a as string;
            const sb = b as string;
            return sa < sb ? -1 : sa > sb ? 1 : 0;
        }
        case 5:
            return Number(a) - Number(b);
        case 6: {
            const da = (a as Date).getTime();
            const db = (b as Date).getTime();
            return da < db ? -1 : da > db ? 1 : 0;
        }
        default: {
            const sa = EJSON.stringify(a, { canonical: true });
            const sb = EJSON.stringify(b, { canonical: true });
            return sa < sb ? -1 : sa > sb ? 1 : 0;
        }
    }
}

/**
 * Resolve a dotted path for sorting: plain traversal with numeric indexing
 * into arrays. (Unlike the matcher, no array fan-out — Mongo's min/max
 * array-element sort semantics are consciously simplified away.)
 */
function valueAtPath(doc: unknown, parts: readonly string[]): unknown {
    let current: unknown = doc;
    for (const part of parts) {
        if (Array.isArray(current) && NUMERIC.test(part)) {
            current = current[Number(part)];
        } else if (isPlainObject(current)) {
            current = current[part];
        } else {
            return undefined;
        }
    }
    return current;
}

export function compileSorter(spec: SortSpec): (a: Document, b: Document) => number {
    const keys: Array<{ parts: string[]; direction: 1 | -1 }> = [];
    if (Array.isArray(spec)) {
        for (const entry of spec) {
            if (!Array.isArray(entry) || typeof entry[0] !== 'string') {
                throw new MeteorError('invalid-sort', 'Array-form sort entries must be [path, "asc" | "desc"]');
            }
            const [path, direction] = entry;
            if (direction !== 'asc' && direction !== 'desc') {
                throw new MeteorError('invalid-sort', `Invalid sort direction for '${path}': ${String(direction)}`);
            }
            keys.push({ parts: path.split('.'), direction: direction === 'asc' ? 1 : -1 });
        }
    } else {
        for (const [path, direction] of Object.entries(spec)) {
            if (direction !== 1 && direction !== -1) {
                throw new MeteorError('invalid-sort', `Invalid sort direction for '${path}': ${String(direction)}`);
            }
            keys.push({ parts: path.split('.'), direction });
        }
    }
    return (a, b) => {
        for (const { parts, direction } of keys) {
            const result = compareValues(valueAtPath(a, parts), valueAtPath(b, parts));
            if (result !== 0) {
                return direction * result;
            }
        }
        return 0;
    };
}
