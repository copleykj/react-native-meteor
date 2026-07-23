import Data from './Data';
import MeteorError from './lib/error';

export interface ApplyOptions {
    /**
     * Don't re-send this method if the connection drops before the result
     * arrives — the call rejects instead. For methods that are not
     * idempotent (payments!).
     */
    noRetry?: boolean;
    /** Called with the raw result as soon as it arrives (before the promise settles). */
    onResultReceived?: (error: unknown, result: unknown) => void;
}

type Callback = (error?: unknown, result?: unknown) => void;

interface DDPLike {
    method(name: string, params: unknown[], options?: { noRetry?: boolean }): string;
}

function enqueue(name: string, args: unknown[], callback: Callback | undefined, options?: ApplyOptions): void {
    const ddp = Data.ddp as DDPLike | null;
    if (!ddp) {
        const error = new MeteorError('not-connected', 'Meteor.connect must be called before calling methods');
        if (callback) {
            callback(error);
            return;
        }
        throw error;
    }
    const id = ddp.method(name, args, { noRetry: options?.noRetry });
    (Data.calls as Array<{ id: string; callback?: Callback }>).push({ id, callback });
}

/**
 * Legacy callback-style Meteor.call: `call('name', arg1, arg2, (err, res) => {})`.
 */
export default function call(eventName: string, ...argsAndCallback: unknown[]): void {
    const args = [...argsAndCallback];
    let callback: Callback | undefined;
    if (args.length && typeof args[args.length - 1] === 'function') {
        callback = args.pop() as Callback;
    }
    enqueue(eventName, args, callback);
}

/**
 * Meteor 3-style applyAsync: promise resolves with the method result,
 * rejects with the (deserialized) Meteor.Error the server threw.
 */
export function applyAsync<TResult = unknown>(name: string, args: unknown[] = [], options: ApplyOptions = {}): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
        enqueue(
            name,
            args,
            (error, result) => {
                options.onResultReceived?.(error, result);
                if (error) {
                    reject(error);
                } else {
                    resolve(result as TResult);
                }
            },
            options,
        );
    });
}

/** Meteor 3-style callAsync: `await callAsync('name', arg1, arg2)`. */
export function callAsync<TResult = unknown>(name: string, ...args: unknown[]): Promise<TResult> {
    return applyAsync<TResult>(name, args);
}
