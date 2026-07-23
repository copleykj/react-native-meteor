// Typed port of Meteor's mongo-id package:
// https://github.com/meteor/meteor/tree/devel/packages/mongo-id
import EJSON from './ejson';
import Random from './random';

function looksLikeObjectID(str: string): boolean {
    return str.length === 24 && /^[0-9a-f]*$/.test(str);
}

export class ObjectID {
    _str: string;

    constructor(hexString?: string) {
        if (hexString) {
            hexString = hexString.toLowerCase();
            if (!looksLikeObjectID(hexString)) {
                throw new Error('Invalid hexadecimal string for creating an ObjectID');
            }
            this._str = hexString;
        } else {
            this._str = Random.hexString(24);
        }
    }

    toString(): string {
        return `ObjectID("${this._str}")`;
    }

    equals(other: unknown): boolean {
        return other instanceof ObjectID && this.valueOf() === other.valueOf();
    }

    clone(): ObjectID {
        return new ObjectID(this._str);
    }

    typeName(): string {
        return 'oid';
    }

    getTimestamp(): number {
        return parseInt(this._str.substring(0, 8), 16);
    }

    valueOf(): string {
        return this._str;
    }

    toJSONValue(): string {
        return this._str;
    }

    toHexString(): string {
        return this._str;
    }
}

export type MeteorId = string | ObjectID | number | boolean | null | undefined;

const MongoID = {
    ObjectID,
    _looksLikeObjectID: looksLikeObjectID,

    idStringify(id: MeteorId): string {
        if (id instanceof ObjectID) {
            return id.valueOf();
        } else if (typeof id === 'string') {
            if (id === '') {
                return id;
            } else if (
                id.startsWith('-') || // escape previously dashed strings
                id.startsWith('~') || // escape escaped numbers, true, false
                looksLikeObjectID(id) || // escape object-id-form strings
                id.startsWith('{') // escape object-form strings
            ) {
                return `-${id}`;
            } else {
                return id;
            }
        } else if (id === undefined) {
            return '-';
        } else if (typeof id === 'object' && id !== null) {
            throw new Error('Meteor does not currently support objects other than ObjectID as ids');
        } else {
            // Numbers, true, false, null
            return `~${JSON.stringify(id)}`;
        }
    },

    idParse(id: string): MeteorId {
        if (id === '') {
            return id;
        } else if (id === '-') {
            return undefined;
        } else if (id.startsWith('-')) {
            return id.substring(1);
        } else if (id.startsWith('~')) {
            return JSON.parse(id.substring(1)) as MeteorId;
        } else if (looksLikeObjectID(id)) {
            return new ObjectID(id);
        } else {
            return id;
        }
    },
};

// addType throws on double registration (e.g. two package copies in a
// bundle) — first one wins.
try {
    EJSON.addType('oid', (str) => new ObjectID(str as string));
} catch {
    // already registered
}

export default MongoID;
