import EJSON from './ejson';

/**
 * Meteor.Error — the error type methods throw across the wire. Matches
 * Meteor core's shape ({error, reason, details}) and EJSON serialization
 * (type name "Meteor.Error") so errors round-trip between a Meteor 3 server
 * and this client.
 */
export default class MeteorError extends Error {
    static errorType = 'Meteor.Error';

    /** Machine code identifying the kind of error, e.g. `'not-authorized'` or 403. */
    error: string | number;
    /** Short developer-facing summary, e.g. `'Not Found'`. */
    reason?: string;
    /** Additional debugging detail. */
    details?: string;
    /** Meteor marks wire-safe errors so the server knows they're intentional. */
    isClientSafe = true;

    constructor(error: string | number, reason?: string, details?: string) {
        super(reason ? `${reason} [${error}]` : `[${error}]`);
        this.name = 'Meteor.Error';
        this.error = error;
        this.reason = reason;
        this.details = details;
    }

    clone(): MeteorError {
        return new MeteorError(this.error, this.reason, this.details);
    }

    typeName(): string {
        return MeteorError.errorType;
    }

    toJSONValue(): { error: string | number; reason?: string; details?: string; message: string; isClientSafe: boolean } {
        return {
            error: this.error,
            reason: this.reason,
            details: this.details,
            message: this.message,
            isClientSafe: this.isClientSafe,
        };
    }
}

// EJSON registration lets server-thrown Meteor.Errors deserialize into real
// MeteorError instances. addType throws on double-registration, which can
// happen with multiple copies of this package in one bundle — first one wins.
try {
    EJSON.addType(MeteorError.errorType, (json) => {
        const { error, reason, details } = json as { error: string | number; reason?: string; details?: string };
        return new MeteorError(error, reason, details);
    });
} catch {
    // already registered
}
