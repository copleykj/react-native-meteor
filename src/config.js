import Minimongo from 'minimongo-cache';
import MeteorError from './lib/Error';

const db = new Minimongo();
let NetInfo = null;
let isReactNative = false;
let Storage = null;
let InteractionManager = null;

const configureOptionalDeps = (options = { NetInfo: null, isReactNative: true, Storage: localStorage, InteractionManager: null, batchedUpdates: null }) => {
    ({ NetInfo, isReactNative, Storage, InteractionManager } = options);

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
