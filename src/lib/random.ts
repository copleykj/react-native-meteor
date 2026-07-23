/**
 * Meteor-compatible Random, backed by a cryptographically secure source when
 * one is available.
 *
 * React Native's Hermes runtime has no WebCrypto by default; apps get
 * `crypto.getRandomValues` from `react-native-get-random-values` or
 * `expo-crypto`'s polyfill. When neither is present we fall back to
 * `Math.random` with a one-time warning rather than throwing — client-side
 * ids only need uniqueness, but tokens/secrets deserve real entropy, so the
 * warning tells integrators how to get it.
 */

// Chars that can't be visually confused with each other, from Meteor's
// random package (no 0/O/1/I/l/u).
const UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const HEX_CHARS = '0123456789abcdef';

let warned = false;

function secureRandomBytes(length: number): Uint8Array | null {
    const crypto = (globalThis as { crypto?: { getRandomValues?<T extends ArrayBufferView>(array: T): T } }).crypto;
    if (crypto?.getRandomValues) {
        return crypto.getRandomValues(new Uint8Array(length));
    }
    return null;
}

function randomChars(alphabet: string, count: number): string {
    const bytes = secureRandomBytes(count);
    let result = '';
    if (bytes) {
        // Rejection-free mapping is fine here: the small modulo bias from
        // 256 % alphabet.length is irrelevant for id/token purposes at these
        // alphabet sizes, and it's what keeps this a single pass.
        for (let i = 0; i < count; i++) {
            result += alphabet[bytes[i]! % alphabet.length];
        }
        return result;
    }

    if (!warned) {
        warned = true;
        console.warn(
            '@socialize/react-native-meteor: no secure random source found; ' +
                'falling back to Math.random. Install react-native-get-random-values ' +
                "(or expo-crypto's polyfill) and import it before this package for " +
                'cryptographically secure ids and tokens.',
        );
    }
    for (let i = 0; i < count; i++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return result;
}

function choice(source: string): string | undefined;
function choice<T>(source: readonly T[]): T | undefined;
function choice<T>(source: string | readonly T[]): string | T | undefined {
    if (source.length === 0) return undefined;
    const index = Math.floor(Random.fraction() * source.length);
    return source[index];
}

const Random = {
    /** A unique identifier, e.g. `"Jjwjg6gouWLXhMGKW"` — Meteor's document id format. */
    id(count = 17): string {
        return randomChars(UNMISTAKABLE_CHARS, count);
    },

    /** A random string suitable for security tokens (base64url alphabet). */
    secret(count = 43): string {
        return randomChars(BASE64_CHARS, count);
    },

    /** A random hex string of `digits` characters (used by Mongo ObjectIDs). */
    hexString(digits: number): string {
        return randomChars(HEX_CHARS, digits);
    },

    /** A number in [0, 1), from the secure source when available. */
    fraction(): number {
        const bytes = secureRandomBytes(4);
        if (bytes) {
            const value = ((bytes[0]! << 24) | (bytes[1]! << 16) | (bytes[2]! << 8) | bytes[3]!) >>> 0;
            return value / 0x100000000;
        }
        return Math.random();
    },

    /** A random element of an array, or a random character of a string. */
    choice,
};

export default Random;
