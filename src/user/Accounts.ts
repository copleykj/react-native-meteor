import Data from '../Data';
import { applyAsync } from '../Call';
import User, { withCallback, type LoginResult } from './User';
import MeteorError from '../lib/error';
import { hashPassword } from '../lib/utils';

export interface CreateUserOptions {
    username?: string;
    email?: string;
    password: string;
    profile?: Record<string, unknown>;
}

type Callback = (error?: unknown) => void;

/**
 * Promise-first accounts API matching Meteor 3's async accounts surface.
 * Wire protocol identical to accounts-password: passwords cross as
 * {digest: sha256-hex, algorithm: 'sha-256'}.
 */
const Accounts = {
    createUser(options: CreateUserOptions, callback?: Callback): Promise<LoginResult> {
        // v3 mutated the caller's options object with the hashed password.
        const withHashed = { ...options, password: hashPassword(options.password) };
        const promise = (async () => {
            User._startLoggingIn();
            try {
                const result = (await applyAsync('createUser', [withHashed])) as LoginResult;
                await User._handleLoginCallback(undefined, result);
                return result;
            } catch (error) {
                await User._handleLoginCallback(error, undefined);
                throw error;
            } finally {
                User._endLoggingIn();
            }
        })();
        return withCallback(promise, callback);
    },

    changePassword(oldPassword: string | null, newPassword: string, callback?: Callback): Promise<void> {
        const promise = (async () => {
            if (typeof newPassword !== 'string' || !newPassword) {
                throw new MeteorError('EmptyPassword', 'Password may not be empty');
            }
            await applyAsync('changePassword', [
                oldPassword ? hashPassword(oldPassword) : null,
                hashPassword(newPassword),
            ]);
        })();
        return withCallback(promise, callback);
    },

    forgotPassword(options: { email: string }, callback?: Callback): Promise<void> {
        const promise = (async () => {
            if (!options.email) {
                throw new MeteorError('EmptyEmail', 'Must pass options.email');
            }
            await applyAsync('forgotPassword', [options]);
        })();
        return withCallback(promise, callback);
    },

    resetPassword(token: string, newPassword: string, callback?: Callback): Promise<LoginResult> {
        const promise = (async () => {
            if (!newPassword) {
                throw new MeteorError('EmptyPassword', 'Password may not be empty');
            }
            const result = (await applyAsync('resetPassword', [token, hashPassword(newPassword)])) as LoginResult;
            // Server returns a fresh login token — log straight in with it.
            await User._handleLoginCallback(undefined, result);
            return result;
        })();
        return withCallback(promise, callback);
    },

    verifyEmail(token: string, callback?: Callback): Promise<LoginResult> {
        const promise = (async () => {
            const result = (await applyAsync('verifyEmail', [token])) as LoginResult;
            await User._handleLoginCallback(undefined, result);
            return result;
        })();
        return withCallback(promise, callback);
    },

    onLogin(callback: () => void): void {
        Data.on('onLogin', callback);
    },

    onLoginFailure(callback: () => void): void {
        Data.on('onLoginFailure', callback);
    },

    onLogout(callback: () => void): void {
        Data.on('onLogout', callback);
    },
};

export default Accounts;
