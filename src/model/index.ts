import type { z } from 'zod';
import { Collection, type Cursor } from '../Collection';
import MeteorError from '../lib/error';
import type { FindOptions } from '../cache/store';
import type { Document, Selector, Modifier } from '../cache/types';
import { isDenyUntrusted } from './schema-helpers';

export { SchemaHelpers, CustomTypes, denyUntrusted } from './schema-helpers';

export interface ModelOptions<Shape extends z.ZodRawShape> {
    name: string;
    schema: z.ZodObject<Shape>;
    /** Reuse an existing Collection instead of creating one. */
    collection?: Collection<z.infer<z.ZodObject<Shape>>>;
}

/** Extract the document type: `type Task = ModelType<typeof TaskModel>` */
export type ModelType<M> = M extends Model<infer Shape> ? z.infer<z.ZodObject<Shape>> : never;

/**
 * Client-side port of typed:model v2: Zod-validated, type-inferred
 * collections sharing one schema file with a typed:model server.
 *
 * Every write validates against the schema before the optimistic cache
 * write and the DDP round trip (Zod defaults — e.g. helper timestamps —
 * are applied to the local document). Fields marked `denyUntrusted` are
 * rejected client-side immediately; the server remains the authority.
 *
 * Server-only typed:model features (`allow`/`deny` rules, `bypassSchema`)
 * have no client counterpart.
 */
export class Model<Shape extends z.ZodRawShape> {
    readonly name: string;
    readonly schema: z.ZodObject<Shape>;
    readonly collection: Collection<z.infer<z.ZodObject<Shape>>>;
    private readonly protectedFields: Set<string>;

    constructor(options: ModelOptions<Shape>) {
        this.name = options.name;
        this.schema = options.schema;
        this.collection =
            options.collection ??
            new Collection<z.infer<z.ZodObject<Shape>>>(options.name, {
                schema: this.schema as never,
            });
        this.protectedFields = new Set(
            Object.entries(this.schema.shape).filter(([, field]) => isDenyUntrusted(field as z.ZodType)).map(([key]) => key),
        );
    }

    find(selector: Selector | string = {}, options?: FindOptions): Cursor<z.infer<z.ZodObject<Shape>>> {
        return this.collection.find(selector, options);
    }

    async findOneAsync(selector: Selector | string = {}, options?: FindOptions): Promise<z.infer<z.ZodObject<Shape>> | undefined> {
        return this.collection.findOne(selector, options);
    }

    async insertAsync(doc: z.input<z.ZodObject<Shape>>): Promise<string> {
        this.assertNoProtectedFields(Object.keys(doc as Record<string, unknown>), 'insert');
        return this.collection.insertAsync(doc as Record<string, unknown>);
    }

    async updateAsync(selector: string | Selector, modifier: Modifier): Promise<string> {
        this.assertNoProtectedFields(modifiedTopLevelFields(modifier), 'update');
        return this.collection.updateAsync(selector, modifier);
    }

    async upsertAsync(selector: string | Selector, modifier: Modifier): Promise<{ numberAffected: number; insertedId?: string }> {
        const existing = this.collection.findOne(selector);
        if (existing) {
            await this.updateAsync(selector, modifier);
            return { numberAffected: 1 };
        }
        // Client-side upsert-as-insert: seed from the selector's equality
        // fields plus the modifier's $set / $setOnInsert / plain fields.
        this.assertNoProtectedFields(modifiedTopLevelFields(modifier), 'upsert');
        const seed: Record<string, unknown> = {};
        if (typeof selector === 'string') {
            seed._id = selector;
        } else {
            for (const [key, value] of Object.entries(selector)) {
                if (!key.startsWith('$') && (typeof value !== 'object' || value === null)) seed[key] = value;
            }
        }
        const hasOperators = Object.keys(modifier).some((key) => key.startsWith('$'));
        if (hasOperators) {
            Object.assign(seed, (modifier.$set as Record<string, unknown>) ?? {}, (modifier.$setOnInsert as Record<string, unknown>) ?? {});
        } else {
            Object.assign(seed, modifier);
        }
        const insertedId = await this.insertAsync(seed as z.input<z.ZodObject<Shape>>);
        return { numberAffected: 1, insertedId };
    }

    async removeAsync(selector: string | Selector): Promise<void> {
        return this.collection.removeAsync(selector);
    }

    private assertNoProtectedFields(fields: string[], operation: string): void {
        for (const field of fields) {
            const topLevel = field.split('.')[0]!;
            if (this.protectedFields.has(topLevel)) {
                throw new MeteorError(
                    'protected-field',
                    `Field '${topLevel}' is denyUntrusted and cannot be ${operation}ed from the client`,
                );
            }
        }
    }
}

function modifiedTopLevelFields(modifier: Modifier): string[] {
    const fields: string[] = [];
    for (const [key, value] of Object.entries(modifier)) {
        if (key.startsWith('$')) {
            if (value && typeof value === 'object') {
                fields.push(...Object.keys(value as Record<string, unknown>));
            }
        } else {
            fields.push(key);
        }
    }
    return fields;
}

export type { Document, Selector, Modifier, FindOptions };
