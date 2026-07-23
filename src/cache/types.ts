/**
 * Shared types for the client-side document cache's Mongo-subset query
 * engines (matcher, modifier, sorter, projector). Documents are EJSON-able
 * plain objects keyed by a string `_id`.
 */

export type Document = { _id: string } & Record<string, unknown>;

export type Selector = Record<string, unknown>;

export type Modifier = Record<string, unknown>;

export type SortSpec = Record<string, 1 | -1> | Array<[string, 'asc' | 'desc']>;

export type FieldsSpec = Record<string, 0 | 1 | boolean>;
