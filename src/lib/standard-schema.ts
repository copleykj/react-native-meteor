/**
 * Minimal structural typing for the Standard Schema spec
 * (https://standardschema.dev) — implemented by Zod 3.24+/4, Valibot, and
 * ArkType. Depending on the interface instead of any validation library
 * keeps the core dependency-free; the /model subpath builds Zod-specific
 * conveniences on top.
 */
export interface StandardSchemaV1<Input = unknown, Output = Input> {
    readonly '~standard': {
        readonly version: 1;
        readonly vendor: string;
        validate(value: unknown): StandardSchemaResult<Output> | Promise<StandardSchemaResult<Output>>;
    };
    /** Phantom types for inference; never present at runtime. */
    readonly '~types'?: { input: Input; output: Output } | undefined;
}

export type StandardSchemaResult<Output> =
    | { value: Output; issues?: undefined }
    | { issues: ReadonlyArray<{ message: string; path?: ReadonlyArray<PropertyKey | { key: PropertyKey }> }> };

export type InferOutput<Schema extends StandardSchemaV1> = Schema extends StandardSchemaV1<unknown, infer Output> ? Output : never;
