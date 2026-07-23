// Minimal ambient types for the `ejson` package (Meteor's EJSON extraction,
// which ships no declarations). Superseded by the typed wrapper in
// src/lib/ejson.ts when Phase 1 of the v4 rewrite lands.
declare module 'ejson' {
    export type EJSONableCustomType = {
        clone?(): EJSONableCustomType;
        equals?(other: unknown): boolean;
        toJSONValue(): unknown;
        typeName(): string;
    };

    const EJSON: {
        parse(str: string): unknown;
        stringify(value: unknown, options?: { indent?: boolean | number | string; canonical?: boolean }): string;
        fromJSONValue(value: unknown): unknown;
        toJSONValue(value: unknown): unknown;
        equals(a: unknown, b: unknown, options?: { keyOrderSensitive?: boolean }): boolean;
        clone<T>(value: T): T;
        newBinary(length: number): Uint8Array;
        isBinary(value: unknown): boolean;
        addType(name: string, factory: (json: unknown) => EJSONableCustomType): void;
    };
    export default EJSON;
}
