import Tracker from './tracker';
import EJSON from './lib/ejson';
import Data from './Data';
import Random from './lib/random';
import { applyAsync } from './Call';
import MeteorError from './lib/error';
import { isPlainObject } from './lib/utils';
import { applyModifier } from './cache/modifier';
import type { LocalCollection, FindOptions } from './cache/store';
import type { Document, Selector, Modifier } from './cache/types';
import type { StandardSchemaV1 } from './lib/standard-schema';

export type Transform<T> = ((doc: Document) => T) | null | undefined;

export interface CollectionOptions<T> {
    transform?: (doc: Document) => T;
    /**
     * Optional Standard Schema (Zod 4, Valibot, ArkType…). When present,
     * inserts and the post-modifier result of updates are validated locally
     * before the optimistic write and the server round trip — validation
     * errors surface immediately as MeteorError('validation-error').
     */
    schema?: StandardSchemaV1<unknown, T>;
}

type WrappedTransform<T> = ((doc: Document) => T) & { __wrappedTransform__?: boolean };

export class Cursor<T> {
    constructor(
        private readonly transform: WrappedTransform<T> | null,
        private readonly docs: Document[],
        /** Which store produced this cursor — lets useFind subscribe per-collection. */
        readonly collectionStore?: LocalCollection,
    ) {}

    count(): number {
        return this.docs.length;
    }

    fetch(): T[] {
        return this.transformedDocs();
    }

    forEach(callback: (doc: T, index: number) => void): void {
        this.transformedDocs().forEach(callback);
    }

    map<U>(callback: (doc: T, index: number) => U): U[] {
        return this.transformedDocs().map(callback);
    }

    private transformedDocs(): T[] {
        return this.transform ? this.docs.map(this.transform) : (this.docs as unknown as T[]);
    }
}

type InsertCallback = (error?: unknown, id?: string) => void;
type UpdateCallback = (error?: unknown, result?: unknown) => void;

export class Collection<T = Document> {
    private readonly store: LocalCollection;
    readonly _name: string;
    private readonly _transform: WrappedTransform<T> | null;
    private readonly schema?: StandardSchemaV1<unknown, T>;

    constructor(name: string, options: CollectionOptions<T> = {}) {
        this.store = (Data.db as { collection(name: string): LocalCollection }).collection(name);
        this._name = name;
        this._transform = wrapTransform(options.transform);
        this.schema = options.schema;
    }

    /** Escape hatch: the raw local store (no transform, no reactivity helpers). */
    get rawCollection(): LocalCollection {
        return this.store;
    }

    find(selector: Selector | string = {}, options?: FindOptions): Cursor<T> {
        let docs: Document[];
        if (typeof selector === 'string') {
            selector = { _id: selector };
        }
        if (typeof selector._id === 'string') {
            const doc = this.store.get(selector._id);
            docs = doc ? [doc] : [];
        } else {
            docs = this.store.find(selector, options);
        }
        return new Cursor(this._transform, docs, this.store);
    }

    findOne(selector: Selector | string = {}, options?: FindOptions): T | undefined {
        return this.find(selector, options).fetch()[0];
    }

    // ---- writes (Promise-first; callback forms are thin wrappers) ---------

    async insertAsync(item: Record<string, unknown>): Promise<string> {
        const doc = { ...item } as Document;
        if ('_id' in doc && doc._id !== undefined) {
            if (!doc._id || typeof doc._id !== 'string') {
                throw new MeteorError('invalid-id', 'Meteor requires document _id fields to be non-empty strings');
            }
        } else {
            doc._id = Random.id();
        }
        if (this.store.get(doc._id)) {
            throw new MeteorError(409, `Duplicate key _id with value ${doc._id}`);
        }
        // No await before the optimistic write when there's no schema: callers
        // observe the write synchronously, like v3 and like Meteor stubs.
        if (this.schema) await this.validate(doc);

        this.store.upsert(doc);
        try {
            await this.callWhenConnected(`/${this._name}/insert`, [doc]);
            return doc._id;
        } catch (error) {
            this.store.del(doc._id); // roll back the optimistic insert
            throw error;
        }
    }

    async updateAsync(selector: string | Selector, modifier: Modifier): Promise<string> {
        const id = typeof selector === 'string' ? selector : (selector._id as string);
        const existing = this.store.get(id);
        if (!existing) {
            throw new MeteorError(409, `Item not found in collection ${this._name} with id ${String(id)}`);
        }
        const snapshot = EJSON.clone(existing);
        const updated = applyModifier(existing, modifier);
        if (this.schema) await this.validate(updated);

        this.store.upsert(updated);
        try {
            await this.callWhenConnected(`/${this._name}/update`, [{ _id: id }, modifier]);
            return id;
        } catch (error) {
            this.store.upsert(snapshot); // restore pre-update state
            throw error;
        }
    }

    async removeAsync(selector: string | Selector): Promise<void> {
        const id = typeof selector === 'string' ? selector : (selector._id as string);
        const existing = this.store.get(id);
        if (!existing) {
            throw new MeteorError(404, `No document with _id : ${String(id)}`);
        }
        const snapshot = EJSON.clone(existing);
        this.store.del(id);
        try {
            await this.callWhenConnected(`/${this._name}/remove`, [{ _id: id }]);
        } catch (error) {
            this.store.upsert(snapshot); // restore the removed document
            throw error;
        }
    }

    // ---- legacy v3 callback forms -----------------------------------------

    insert(item: Record<string, unknown>, callback: InsertCallback = () => {}): string {
        const id = typeof item._id === 'string' && item._id ? item._id : (item._id = Random.id()) as string;
        this.insertAsync(item).then(
            (insertedId) => callback(null, insertedId),
            (error) => callback(error),
        );
        return id;
    }

    update(selector: string | Selector, modifier: Modifier, optionsOrCallback?: object | UpdateCallback, maybeCallback?: UpdateCallback): void {
        const callback = (typeof optionsOrCallback === 'function' ? optionsOrCallback : maybeCallback) ?? (() => {});
        this.updateAsync(selector, modifier).then(
            (id) => callback(null, id),
            (error) => callback(error),
        );
    }

    remove(selector: string | Selector, callback: UpdateCallback = () => {}): void {
        this.removeAsync(selector).then(
            (result) => callback(null, result),
            (error) => callback(error),
        );
    }

    // ---- internals ---------------------------------------------------------

    private callWhenConnected(method: string, args: unknown[]): Promise<unknown> {
        return new Promise((resolve, reject) => {
            (Data.waitDdpConnected as (cb: () => void) => void)(() => {
                applyAsync(method, args).then(resolve, reject);
            });
        });
    }

    private async validate(doc: Document): Promise<void> {
        if (!this.schema) return;
        const result = await this.schema['~standard'].validate(doc);
        if (result.issues) {
            throw new MeteorError(
                'validation-error',
                `Validation failed for collection ${this._name}`,
                result.issues.map((issue) => issue.message).join('; '),
            );
        }
    }
}

// From Meteor core: wrap a transform so returned objects keep the _id of the
// untransformed document.
function wrapTransform<T>(transform: ((doc: Document) => T) | undefined): WrappedTransform<T> | null {
    if (!transform) return null;
    const asWrapped = transform as WrappedTransform<T>;
    if (asWrapped.__wrappedTransform__) return asWrapped;

    const wrapped: WrappedTransform<T> = (doc: Document) => {
        if (!doc._id) {
            throw new MeteorError('invalid-transform', 'can only transform documents with _id');
        }
        const id = doc._id;
        const transformed = Tracker.nonreactive(() => transform(doc)) as Record<string, unknown>;
        if (!isPlainObject(transformed)) {
            throw new MeteorError('invalid-transform', 'transform must return object');
        }
        if (transformed._id) {
            if (!EJSON.equals(transformed._id as never, id as never)) {
                throw new MeteorError('invalid-transform', "transformed document can't have different _id");
            }
        } else {
            transformed._id = id;
        }
        return transformed as T;
    };
    wrapped.__wrappedTransform__ = true;
    return wrapped;
}

// Legacy default-less named export parity with v3.
export default Collection;
