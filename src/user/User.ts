import Data from '../Data';
import Tracker from '../tracker';
import { hashPassword } from '../lib/utils';
import { applyAsync } from '../Call';
import { Collection } from '../Collection';
import config from '../config';
import type { Document } from '../cache/types';

/**
 * Unchanged from v3 so upgrading apps keep their users logged in.
 */
const TOKEN_KEY = 'reactnativemeteor_usertoken';

export interface LoginResult {
    id: string;
    token: string;
    tokenExpires?: Date | { $date: number };
}

/** Attach an optional legacy callback to a promise without breaking await. */
export function withCallback<T>(promise: Promise<T>, callback?: (error?: unknown, result?: T) => void): Promise<T> {
    if (callback) {
        promise.then(
            (result) => callback(undefined, result),
            (error) => callback(error),
        );
        // Callback callers shouldn't get unhandled-rejection noise.
        promise.catch(() => {});
    }
    return promise;
}

const userDep = new Tracker.Dependency();
const loggingInDep = new Tracker.Dependency();

/**
 * User/session methods. Spread into the Meteor facade, so `this` is the
 * Meteor object — call them as `Meteor.user()`, `Meteor.loginWithPassword()`.
 * All login-related methods are Promise-first; trailing callbacks are
 * accepted for v3 migration ease.
 */
// Session state lives at module scope, NOT on the User object: User's
// methods are spread into the Meteor facade, and object-held state would
// split-brain between the two copies (a real v3 bug — createUser logged in
// via the Accounts path but Meteor.userId() stayed null).
let userIdSaved: string | null = null;
let isLoggingIn = true;
let resumeInFlight: Promise<unknown> | null = null;

const User = {
    users: new Collection<Document>('users'),

    user(): Document | null {
        userDep.depend();
        if (!userIdSaved) return null;
        return User.users.findOne(userIdSaved) ?? null;
    },

    userId(): string | null {
        userDep.depend();
        return userIdSaved;
    },

    loggingIn(): boolean {
        loggingInDep.depend();
        return isLoggingIn;
    },

    loginWithPassword(selector: string | Record<string, string>, password: string, callback?: (error?: unknown) => void): Promise<LoginResult> {
        if (typeof selector === 'string') {
            selector = selector.includes('@') ? { email: selector } : { username: selector };
        }
        return withCallback(
            User._loginWithLoginMethod([{ user: selector, password: hashPassword(password) }]),
            callback,
        );
    },

    /** Log in with a resume token (e.g. from another device or a saved session). */
    loginWithToken(token: string, callback?: (error?: unknown) => void): Promise<LoginResult> {
        return withCallback(User._loginWithLoginMethod([{ resume: token }]), callback);
    },

    logout(callback?: (error?: unknown) => void): Promise<void> {
        const promise = applyAsync('logout')
            .catch(() => {}) // local logout proceeds even if the server call fails
            .then(async () => {
                await User.handleLogout();
                Data.notify('onLogout');
            });
        return withCallback(promise, callback);
    },

    logoutOtherClients(callback?: (error?: unknown) => void): Promise<void> {
        const promise = (async () => {
            const result = (await applyAsync('getNewToken')) as LoginResult;
            await User._handleLoginCallback(undefined, result);
            await applyAsync('removeOtherTokens');
        })();
        return withCallback(promise, callback);
    },

    getAuthToken(): string | null {
        return Data._tokenIdSaved ?? null;
    },

    async getAuthTokenFromStorage(): Promise<string | null> {
        const Storage = config.AsyncStorage;
        return (await Storage.getItem(TOKEN_KEY)) ?? null;
    },

    async handleLogout(): Promise<void> {
        try {
            const Storage = config.AsyncStorage;
            await Storage.removeItem(TOKEN_KEY);
        } catch {
            // No storage configured — in-memory session only.
        }
        Data._tokenIdSaved = null;
        userIdSaved = null;
        userDep.changed();
        Data.notify('change');
    },

    /** Single internal login path (v3 had a broken duplicate, `_login`). */
    async _loginWithLoginMethod(params: unknown[]): Promise<LoginResult> {
        User._startLoggingIn();
        try {
            const result = (await applyAsync('login', params)) as LoginResult;
            await User._handleLoginCallback(undefined, result);
            return result;
        } catch (error) {
            await User._handleLoginCallback(error, undefined);
            throw error;
        } finally {
            User._endLoggingIn();
        }
    },

    _startLoggingIn(): void {
        isLoggingIn = true;
        loggingInDep.changed();
        Data.notify('loggingIn');
    },

    _endLoggingIn(): void {
        isLoggingIn = false;
        loggingInDep.changed();
        Data.notify('loggingIn');
    },

    async _handleLoginCallback(error: unknown, result: LoginResult | undefined): Promise<void> {
        if (!error && result) {
            try {
                const Storage = config.AsyncStorage;
                await Storage.setItem(TOKEN_KEY, result.token);
            } catch {
                // No storage configured — session won't survive a restart.
            }
            Data._tokenIdSaved = result.token;
            userIdSaved = result.id;
            userDep.changed();
            Data.notify('onLogin');
        } else {
            Data.notify('onLoginFailure');
            await User.handleLogout();
        }
        Data.notify('change');
    },

    /** Resume the stored session; called on every (re)connect. Race-safe. */
    async _loadInitialUser(): Promise<void> {
        if (resumeInFlight) {
            await resumeInFlight;
            return;
        }
        const attempt = (async () => {
            let token: string | null = null;
            try {
                token = await User.getAuthTokenFromStorage();
            } catch (error) {
                console.warn(`Error Loading User: ${(error as Error).message}`);
            }
            if (token) {
                try {
                    await User._loginWithLoginMethod([{ resume: token }]);
                } catch {
                    // Invalid/expired token: _handleLoginCallback cleared it.
                }
            } else {
                User._endLoggingIn();
            }
        })();
        resumeInFlight = attempt;
        try {
            await attempt;
        } finally {
            resumeInFlight = null;
        }
    },
};

export default User;
