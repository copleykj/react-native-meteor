export default class MeteorError extends Error {
    static errorType = "Meteor.Error"
    constructor(error, reason, details) {
        let message;
        // String code uniquely identifying this kind of error.
        this.error = error;

        // Optional: A short human-readable summary of the error. Not
        // intended to be shown to end users, just developers. ("Not Found",
        // "Internal Server Error")
        this.reason = reason;

        // Optional: Additional information about the error, say for
        // debugging. It might be a (textual) stack trace if the server is
        // willing to provide one. The corresponding thing in HTTP would be
        // the body of a 404 or 500 response. (The difference is that we
        // never expect this to be shown to end users, only developers, so
        // it doesn't need to be pretty.)
        this.details = details;

        // This is what gets displayed at the top of a stack trace. Current
        // format is "[404]"
        message = reason ? `${reason} [${error}]` : `[${error}]`;
        super(message);
    }
}
