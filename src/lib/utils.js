// import { createHash } from 'crypto';
import EJSON from 'ejson';

import MongoID from './mongo-id';

let i = 0;
export function uniqueId () {
    return (i++).toString();
}

export function contains (array, element) {
    return array.indexOf(element) !== -1;
}

export function hashPassword (password) {
    return {
        digest: createHash('sha256').update(password).digest('hex'),
        algorithm: 'sha-256',
    };
}

export function isPlainObject (obj) {
    return !!obj &&
        !(typeof obj === 'number') &&
        !(typeof obj === 'string') &&
        !(typeof obj === 'boolean') &&
        !(Array.isArray(obj)) &&
        !(obj === null) &&
        !(obj instanceof RegExp) &&
        !(typeof obj === 'function') &&
        !(obj instanceof Date) &&
        !(EJSON.isBinary(obj)) &&
        !(obj instanceof MongoID.ObjectID);
};
