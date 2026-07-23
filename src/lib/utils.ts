import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils.js';

import EJSON from './ejson';
import MongoID from './mongo-id';

// Module-global counter kept for the legacy DDP client only; the Phase 2
// rewrite scopes message ids per connection.
let i = 0;
export function uniqueId(): string {
    return (i++).toString();
}

export function contains(array: readonly unknown[], element: unknown): boolean {
    return array.indexOf(element) !== -1;
}

/**
 * Client-side password hashing matching Meteor's accounts-password wire
 * protocol: the server receives {digest: hex(sha256(password)), algorithm}
 * and bcrypts the digest.
 */
export function hashPassword(password: string): { digest: string; algorithm: 'sha-256' } {
    return {
        digest: bytesToHex(sha256(utf8ToBytes(password))),
        algorithm: 'sha-256',
    };
}

export function isPlainObject(obj: unknown): obj is Record<string, unknown> {
    return (
        !!obj &&
        typeof obj === 'object' &&
        !Array.isArray(obj) &&
        !(obj instanceof RegExp) &&
        !(obj instanceof Date) &&
        !EJSON.isBinary(obj) &&
        !(obj instanceof MongoID.ObjectID)
    );
}
