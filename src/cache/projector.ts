import EJSON from '../lib/ejson';
import MeteorError from '../lib/error';
import { isPlainObject } from '../lib/utils';
import type { Document, FieldsSpec } from './types';

/**
 * Mongo-subset field projection for the client-side document cache.
 *
 * Include mode (1/true values): keep only the listed paths, plus _id unless
 * `_id: 0`. Exclude mode (0/false values): drop the listed paths. Mixing
 * include and exclude throws (except _id, which may be excluded in include
 * mode). Dotted paths are supported; projections descend into arrays of
 * documents. In include mode, non-document array elements under a projected
 * subpath are dropped (a conscious simplification of Mongo's behaviour).
 */

type PathTree = { [key: string]: PathTree | true };

function buildTree(paths: readonly string[]): PathTree {
    const root: PathTree = {};
    for (const path of paths) {
        const parts = path.split('.');
        let node = root;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i] ?? '';
            if (i === parts.length - 1) {
                node[part] = true;
            } else {
                const existing = node[part];
                if (existing === true) {
                    break; // a broader path already keeps the whole subtree
                }
                if (existing === undefined) {
                    const sub: PathTree = {};
                    node[part] = sub;
                    node = sub;
                } else {
                    node = existing;
                }
            }
        }
    }
    return root;
}

function pick(value: Record<string, unknown>, tree: PathTree): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const [key, node] of Object.entries(tree)) {
        if (!(key in value)) {
            continue;
        }
        const child = value[key];
        if (node === true) {
            out[key] = EJSON.clone(child);
        } else if (Array.isArray(child)) {
            out[key] = child.filter(isPlainObject).map((element) => pick(element, node));
        } else if (isPlainObject(child)) {
            out[key] = pick(child, node);
        }
        // Scalars under a deeper include path contribute nothing.
    }
    return out;
}

function excise(value: unknown, parts: readonly string[], index: number): void {
    if (Array.isArray(value)) {
        for (const element of value) {
            excise(element, parts, index);
        }
        return;
    }
    if (!isPlainObject(value)) {
        return;
    }
    const part = parts[index] ?? '';
    if (index === parts.length - 1) {
        delete value[part];
        return;
    }
    excise(value[part], parts, index + 1);
}

export function applyProjection(doc: Document, fields: FieldsSpec | undefined): Document {
    if (!fields || Object.keys(fields).length === 0) {
        return EJSON.clone(doc);
    }
    const includes: string[] = [];
    const excludes: string[] = [];
    for (const [path, flag] of Object.entries(fields)) {
        if (path === '_id') {
            continue;
        }
        if (flag === 1 || flag === true) {
            includes.push(path);
        } else if (flag === 0 || flag === false) {
            excludes.push(path);
        } else {
            throw new MeteorError('invalid-fields', `Invalid field specifier for '${path}': ${String(flag)}`);
        }
    }
    if (includes.length > 0 && excludes.length > 0) {
        throw new MeteorError('invalid-fields', 'Projection cannot mix inclusion and exclusion (except _id)');
    }
    const idFlag = fields._id;
    const keepId = !(idFlag === 0 || idFlag === false);
    if (includes.length > 0 || (excludes.length === 0 && keepId)) {
        // Include mode ({_id: 1} alone also lands here).
        const out = pick(doc, buildTree(includes));
        if (keepId) {
            out._id = doc._id;
        } else {
            delete out._id;
        }
        return out as Document;
    }
    // Exclude mode ({_id: 0} alone also lands here).
    const out = EJSON.clone(doc) as Record<string, unknown>;
    for (const path of excludes) {
        excise(out, path.split('.'), 0);
    }
    if (!keepId) {
        delete out._id;
    }
    return out as Document;
}
