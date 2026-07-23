import { Cache } from './cache/store';
import MeteorError from './lib/error';

const db = new Cache();
let NetInfo = null;
let isReactNative = false;
let Storage = null;
let InteractionManager = null;

// The localStorage default only applies where a global localStorage exists
// (web); in React Native the app injects its storage explicitly.
const defaultStorage = () => (typeof localStorage !== 'undefined' ? localStorage : null);

const configureOptionalDeps = (options = {}) => {
    ({ NetInfo = null, isReactNative = true, Storage = defaultStorage(), InteractionManager = null } = options);

    if (options.batchedUpdates) {
        db.batchedUpdates = options.batchedUpdates;
    }
};

export default {
    get NetInfo () { return NetInfo; },
    get AsyncStorage () {
        if (!Storage) {
            throw new MeteorError('NoStorage', '@socialize/react-native-meteor requires Storage which conforms to localStorage spec. Please use configureOptionalDeps({ Storage: YourStorageObj }) to configure Storage');
        }
        return Storage;
    },
    get InteractionManager () { return InteractionManager; },
};

export { configureOptionalDeps, isReactNative, db };
