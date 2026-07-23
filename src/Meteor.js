import Trackr from './tracker';
import EJSON from './lib/ejson';
import DDP from './ddp/connection';
import Random from './lib/random';
import MeteorError from './lib/error';
import config, { configureOptionalDeps, isReactNative } from './config';

import Data from './Data';
import { Collection } from './Collection';
import call, { callAsync, applyAsync } from './Call';
import ReactiveVar from './ReactiveVar';

import withTracker from './components/withTracker';
import useTracker from './components/useTracker';

import ReactiveDict from './ReactiveDict';

import User from './user/User';
import Accounts from './user/Accounts';

let unsubscribe;

const Meteor = {
    configureOptionalDeps,
    Accounts,
    Random,
    Tracker: Trackr,
    EJSON,
    Error: MeteorError,
    ReactiveDict,
    ReactiveVar,
    isClient: true,
    get isReactNative () { return isReactNative; },
    Mongo: {
        Collection,
    },
    withTracker,
    useTracker,
    getData () {
        return Data;
    },
    ...User,
    status () {
        return Data.ddp
            ? Data.ddp.statusInfo()
            : { connected: false, status: 'disconnected', retryCount: 0, retryTime: null };
    },
    call,
    callAsync,
    applyAsync,
    apply (name, args, callback) {
        if (typeof callback === 'function') {
            call(name, ...(args || []), callback);
        } else {
            call(name, ...(args || []));
        }
    },
    disconnect () {
        if (Data.ddp) {
            Data.ddp.disconnect();
            Data.ddp = null;
        }
        // Method ids are per-connection; entries for the old session can
        // never resolve (and could collide with the next session's ids).
        Data.calls.forEach((call) => {
            typeof call.callback === 'function' &&
                call.callback(new MeteorError('connection', 'Connection closed'));
        });
        Data.calls.splice(0, Data.calls.length);
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    },
    _get (obj/* , arguments */) {
        for (let i = 1; i < arguments.length; i++) {
            if (!(arguments[i] in obj)) { return undefined; }
            obj = obj[arguments[i]];
        }
        return obj;
    },
    _ensure (obj/* , arguments */) {
        for (let i = 1; i < arguments.length; i++) {
            const key = arguments[i];
            if (!(key in obj)) { obj[key] = {}; }
            obj = obj[key];
        }

        return obj;
    },
    _delete (obj/* , arguments */) {
        const stack = [obj];
        let leaf = true;
        for (let i = 1; i < arguments.length - 1; i++) {
            const key = arguments[i];
            if (!(key in obj)) {
                leaf = false;
                break;
            }
            obj = obj[key];
            if (typeof obj !== 'object') { break; }
            stack.push(obj);
        }

        for (let i = stack.length - 1; i >= 0; i--) {
            const key = arguments[i + 1];

            if (leaf) { leaf = false; } else {
                for (const other in stack[i][key]) { return; }
            }
            // not empty -- we're done

            delete stack[i][key];
        }
    },
    _subscriptionsRestart () {
        for (const i in Data.subscriptions) {
            const sub = Data.subscriptions[i];
            Data.ddp.unsub(sub.subIdRemember);
            sub.subIdRemember = Data.ddp.sub(sub.name, sub.params);
        }
    },
    waitDdpConnected: Data.waitDdpConnected.bind(Data),
    reconnect () {
        if (Data.ddp) {
            Data.ddp.connect();
        } else {
            this.connect();
        }
    },
    connect (endpoint, options) {
        if (!Data.ddp) {
            if (!endpoint) { endpoint = Data._endpoint; }
            if (!options) { options = Data._options; }

            Data._endpoint = endpoint;
            Data._options = options;

            this.ddp = Data.ddp = new DDP({
                endpoint,
                SocketConstructor: typeof WebSocket !== 'undefined' ? WebSocket : undefined,
                ...options,
            });

            if (config.NetInfo) {
                // Network state is an input to the DDP reconnect state
                // machine — it decides whether/when to dial.
                unsubscribe = config.NetInfo.addEventListener(({ isConnected }) => {
                    Data.ddp.networkOnline(isConnected !== false);
                });
            }

            Data.ddp.on('connected', () => {
                Data.notify('change');

                console && console.info('Connected to DDP server.');
                this._loadInitialUser().then(() => {
                    this._subscriptionsRestart();
                });
            });

            Data.ddp.on('disconnected', () => {
                Data.notify('change');
                console && console.info('Disconnected from DDP server.');
                // Reconnection is owned entirely by the DDP state machine.
            });

            Data.ddp.on('added', (message) => {
                if (!Data.db[message.collection]) {
                    Data.db.addCollection(message.collection);
                }
                Data.db[message.collection].upsert({
                    _id: message.id,
                    ...message.fields,
                });
            });

            Data.ddp.on('ready', (message) => {
                const idsMap = new Map();
                for (const i in Data.subscriptions) {
                    const sub = Data.subscriptions[i];
                    idsMap.set(sub.subIdRemember, sub.id);
                }
                for (const i in message.subs) {
                    const subId = idsMap.get(message.subs[i]);
                    if (subId) {
                        const sub = Data.subscriptions[subId];
                        sub.ready = true;
                        sub.readyDeps.changed();
                        sub.readyCallback && sub.readyCallback();
                        sub.readyResolve && sub.readyResolve();
                    }
                }
            });

            Data.ddp.on('changed', (message) => {
                const unset = {};
                if (message.cleared) {
                    message.cleared.forEach((field) => {
                        unset[field] = null;
                    });
                }

                Data.db[message.collection] &&
                    Data.db[message.collection].upsert({
                        _id: message.id,
                        ...message.fields,
                        ...unset,
                    });
            });

            Data.ddp.on('removed', (message) => {
                Data.db[message.collection] && Data.db[message.collection].del(message.id);
            });
            Data.ddp.on('result', (message) => {
                const call = Data.calls.find(call => call.id === message.id);
                if (typeof call.callback === 'function') { call.callback(message.error, message.result); }
                Data.calls.splice(Data.calls.findIndex(call => call.id === message.id), 1);
            });

            Data.ddp.on('nosub', (message) => {
                for (const i in Data.subscriptions) {
                    const sub = Data.subscriptions[i];
                    if (sub.subIdRemember === message.id) {
                        if (message.error) {
                            const error = new MeteorError(
                                message.error.error,
                                message.error.reason,
                                message.error.details,
                            );
                            sub.error = error;
                            sub.errorCallback && sub.errorCallback(error);
                            sub.readyReject && sub.readyReject(error);
                            delete Data.subscriptions[sub.id];
                            sub.ready && sub.readyDeps.changed();
                            sub.stopCallback && sub.stopCallback(error);
                        } else {
                            // Server confirmed an unsub; nothing to do.
                            delete Data.subscriptions[sub.id];
                        }
                    }
                }
            });
        } else {
            this.reconnect();
        }
    },
    subscribe (name) {
        const params = Array.prototype.slice.call(arguments, 1);
        let callbacks = {};
        if (params.length) {
            const lastParam = params[params.length - 1];
            if (typeof lastParam === 'function') {
                callbacks.onReady = params.pop();
            } else if (lastParam && (typeof lastParam.onReady === 'function' || typeof lastParam.onError === 'function' || typeof lastParam.onStop === 'function')) {
                callbacks = params.pop();
            }
        }

        // Is there an existing sub with the same name and param, run in an
        // invalidated Computation? This will happen if we are rerunning an
        // existing computation.
        //
        // For example, consider a rerun of:
        //
        //     Tracker.autorun(function () {
        //       Meteor.subscribe("foo", Session.get("foo"));
        //       Meteor.subscribe("bar", Session.get("bar"));
        //     });
        //
        // If "foo" has changed but "bar" has not, we will match the "bar"
        // subcribe to an existing inactive subscription in order to not
        // unsub and resub the subscription unnecessarily.
        //
        // We only look for one such sub; if there are N apparently-identical subs
        // being invalidated, we will require N matching subscribe calls to keep
        // them all active.

        let existing = false;
        for (const i in Data.subscriptions) {
            const sub = Data.subscriptions[i];
            if (sub.inactive && sub.name === name && EJSON.equals(sub.params, params)) { existing = sub; }
        }

        let id;
        if (existing) {
            id = existing.id;
            existing.inactive = false;

            if (callbacks.onReady) {
                // If the sub is not already ready, replace any ready callback with the
                // one provided now. (It's not really clear what users would expect for
                // an onReady callback inside an autorun; the semantics we provide is
                // that at the time the sub first becomes ready, we call the last
                // onReady callback provided, if any.)
                if (!existing.ready) { existing.readyCallback = callbacks.onReady; }
            }
            if (callbacks.onStop) {
                existing.stopCallback = callbacks.onStop;
            }
        } else {
            // New sub! Generate an id, save it locally, and send message.

            id = Random.id();
            const subIdRemember = Data.ddp.sub(name, params);

            let readyResolve, readyReject;
            const readyPromise = new Promise((resolve, reject) => {
                readyResolve = resolve;
                readyReject = reject;
            });
            // A rejection with no awaiter must not crash the app.
            readyPromise.catch(() => {});

            Data.subscriptions[id] = {
                id,
                subIdRemember,
                name,
                params: EJSON.clone(params),
                inactive: false,
                ready: false,
                readyDeps: new Trackr.Dependency(),
                readyCallback: callbacks.onReady,
                errorCallback: callbacks.onError,
                stopCallback: callbacks.onStop,
                readyPromise,
                readyResolve,
                readyReject,
                stop () {
                    Data.ddp.unsub(this.subIdRemember);
                    delete Data.subscriptions[this.id];
                    this.ready && this.readyDeps.changed();

                    if (callbacks.onStop) {
                        callbacks.onStop();
                    }
                },
            };
        }

        // return a handle to the application.
        const handle = {
            stop () {
                if (Data.subscriptions[id]) { Data.subscriptions[id].stop(); }
            },
            ready () {
                if (!Data.subscriptions[id]) { return false; }

                const record = Data.subscriptions[id];
                record.readyDeps.depend();
                return record.ready;
            },
            // Resolves on first ready, rejects if the server denies the
            // subscription (nosub with error). Not part of Meteor core's
            // client API — an async/await convenience of this package.
            readyPromise: Data.subscriptions[id]
                ? Data.subscriptions[id].readyPromise
                : Promise.resolve(),
            subscriptionId: id,
        };

        if (Trackr.active) {
            // We're in a reactive computation, so we'd like to unsubscribe when the
            // computation is invalidated... but not if the rerun just re-subscribes
            // to the same subscription!  When a rerun happens, we use onInvalidate
            // as a change to mark the subscription "inactive" so that it can
            // be reused from the rerun.  If it isn't reused, it's killed from
            // an afterFlush.
            Trackr.onInvalidate(() => {
                if (Data.subscriptions[id]) {
                    Data.subscriptions[id].inactive = true;
                }

                Trackr.afterFlush(() => {
                    if (Data.subscriptions[id] && Data.subscriptions[id].inactive) {
                        handle.stop();
                    }
                });
            });
        }

        return handle;
    },
};

export default Meteor;

// Named exports for the standalone (non-`this`-bound) pieces of the API, so
// both `import Meteor from ...` and `import { withTracker } from ...` work in
// ESM and CJS builds alike. User/session methods must be called as
// `Meteor.user()` etc. and are only available on the default export.
export {
    configureOptionalDeps,
    Accounts,
    Random,
    Trackr as Tracker,
    EJSON,
    MeteorError as Error,
    ReactiveDict,
    withTracker,
    useTracker,
    call,
    Collection,
};
export const Mongo = Meteor.Mongo;
