import EventEmitter from '../lib/emitter';
import { compileMatcher } from './matcher';
import { compileSorter } from './sorter';
import { applyProjection } from './projector';
import type { Document, Selector, FieldsSpec, SortSpec } from './types';

export interface FindOptions {
    sort?: SortSpec;
    skip?: number;
    limit?: number;
    fields?: FieldsSpec;
}

export interface ChangeEvent {
    type: 'added' | 'changed' | 'removed';
    id: string;
    /** For added/changed: the fields written by this event. */
    fields?: Record<string, unknown>;
}

type ChangeListener = (events: ChangeEvent[]) => void;

/**
 * One named collection of documents, keyed by _id.
 *
 * Change notification is fine-grained and batched: every mutation queues a
 * ChangeEvent, and all events from one tick are delivered together in a
 * microtask — a DDP message burst produces one delivery, not N. Listeners
 * receive the event list so they can decide whether a change could affect
 * them (the basis for per-query invalidation in the React bindings).
 *
 * `upsert` merges fields into an existing document rather than replacing it:
 * DDP `changed` messages carry only the fields that changed.
 */
export class LocalCollection {
    private docs = new Map<string, Document>();
    private listeners = new Set<ChangeListener>();
    private pendingEvents: ChangeEvent[] = [];
    private flushScheduled = false;

    constructor(
        readonly name: string,
        private readonly onBatch?: (events: ChangeEvent[]) => void,
    ) {}

    get size(): number {
        return this.docs.size;
    }

    get(id: string): Document | undefined {
        return this.docs.get(id);
    }

    upsert(doc: { _id: string } & Record<string, unknown>): void {
        const existing = this.docs.get(doc._id);
        if (existing) {
            const { _id, ...fields } = doc;
            this.docs.set(_id, { ...existing, ...fields });
            this.queueEvent({ type: 'changed', id: _id, fields });
        } else {
            this.docs.set(doc._id, { ...doc });
            const { _id, ...fields } = doc;
            this.queueEvent({ type: 'added', id: _id, fields });
        }
    }

    del(id: string): void {
        if (this.docs.delete(id)) {
            this.queueEvent({ type: 'removed', id });
        }
    }

    find(selector: Selector = {}, options?: FindOptions): Document[] {
        const matcher = compileMatcher(selector);
        let result: Document[] = [];
        for (const doc of this.docs.values()) {
            if (matcher(doc)) result.push(doc);
        }
        if (options?.sort) {
            result.sort(compileSorter(options.sort));
        }
        if (options?.skip) {
            result = result.slice(options.skip);
        }
        if (options?.limit !== undefined) {
            result = result.slice(0, options.limit);
        }
        if (options?.fields) {
            result = result.map((doc) => applyProjection(doc, options.fields));
        }
        return result;
    }

    findOne(selector: Selector = {}, options?: FindOptions): Document | undefined {
        return this.find(selector, { ...options, limit: 1 })[0];
    }

    /** Subscribe to batched change events for this collection only. */
    onChange(listener: ChangeListener): void {
        this.listeners.add(listener);
    }

    offChange(listener: ChangeListener): void {
        this.listeners.delete(listener);
    }

    private queueEvent(event: ChangeEvent): void {
        this.pendingEvents.push(event);
        if (this.flushScheduled) return;
        this.flushScheduled = true;
        queueMicrotask(() => {
            this.flushScheduled = false;
            const events = this.pendingEvents;
            this.pendingEvents = [];
            for (const listener of [...this.listeners]) {
                listener(events);
            }
            this.onBatch?.(events);
        });
    }
}

/**
 * The client-side database: a registry of LocalCollections.
 *
 * Emits a coarse `change` event (batched per microtask across all
 * collections) for the legacy reactivity path — Data.onChange listens to it.
 * New code should prefer per-collection listeners.
 *
 * For v3 compatibility, collections are also exposed as properties
 * (`db.users`), which means a collection named like a Cache member (`emit`,
 * `addCollection`, …) is reachable only via `collection()` — same caveat the
 * old minimongo-cache had.
 */
export class Cache extends EventEmitter {
    /** Legacy knob; retained so old integrations don't crash. Unused. */
    debug = false;
    /** Legacy hook, assigned by configureOptionalDeps({batchedUpdates}). */
    batchedUpdates?: (fn: () => void) => void;

    private collectionsMap = new Map<string, LocalCollection>();
    private globalFlushScheduled = false;

    addCollection(name: string): LocalCollection {
        const existing = this.collectionsMap.get(name);
        if (existing) return existing;
        const collection = new LocalCollection(name, () => this.scheduleGlobalChange());
        this.collectionsMap.set(name, collection);
        if (!(name in this)) {
            (this as unknown as Record<string, unknown>)[name] = collection;
        }
        return collection;
    }

    /** Get-or-create; safe for any collection name. */
    collection(name: string): LocalCollection {
        return this.collectionsMap.get(name) ?? this.addCollection(name);
    }

    collectionNames(): string[] {
        return [...this.collectionsMap.keys()];
    }

    private scheduleGlobalChange(): void {
        if (this.globalFlushScheduled) return;
        this.globalFlushScheduled = true;
        queueMicrotask(() => {
            this.globalFlushScheduled = false;
            const emit = () => this.emit('change');
            if (this.batchedUpdates) {
                this.batchedUpdates(emit);
            } else {
                emit();
            }
        });
    }
}
