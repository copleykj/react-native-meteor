import { z } from 'zod';

/**
 * Zod schema helpers ported from typed:model v2
 * (https://github.com/copleykj/meteor-typed-model) so one schema file can be
 * shared between a Meteor 3 server (typed:model) and this client.
 *
 * `denyUntrusted` marks fields the client may never write. On the server
 * typed:model enforces it authoritatively; here the Model class fast-fails
 * writes touching marked fields before they reach the wire.
 */

const DENY_UNTRUSTED_MARK = '__typed_model_deny_untrusted__';

export function denyUntrusted<T extends z.ZodType>(schema: T): T {
    return schema.describe(DENY_UNTRUSTED_MARK) as T;
}

export function isDenyUntrusted(schema: z.ZodType): boolean {
    return schema.description === DENY_UNTRUSTED_MARK;
}

export const CustomTypes = {
    nonEmptyString: z.string().min(1),
    stringId: z.string().min(1),
    createdTimestamp: denyUntrusted(z.date().default(() => new Date())),
    updatedTimestamp: denyUntrusted(z.date().default(() => new Date())),
    createdUser: denyUntrusted(z.string().optional()),
    updatedUser: denyUntrusted(z.string().optional()),
    denyUntrusted,
};

export const SchemaHelpers = {
    withTimestamps<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
        return schema.extend({
            createdAt: CustomTypes.createdTimestamp,
            updatedAt: CustomTypes.updatedTimestamp,
        });
    },

    withUsers<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
        return schema.extend({
            createdBy: CustomTypes.createdUser,
            updatedBy: CustomTypes.updatedUser,
        });
    },

    withCommon<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
        return SchemaHelpers.withUsers(SchemaHelpers.withTimestamps(schema));
    },
};
