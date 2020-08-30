import Trackr from 'trackr';
import config, { db } from './config';

process.nextTick = setImmediate;

db.debug = false;

function runAfterOtherComputations (fn) {
    config.InteractionManager ? config.InteractionManager.runAfterInteractions(() => {
        Trackr.afterFlush(() => {
            fn();
        });
    }) : Trackr.afterFlush(() => {
        fn();
    });
}

export default {
    _endpoint: null,
    _options: null,
    ddp: null,
    subscriptions: {},
    db,
    calls: [],

    getUrl () {
        return this._endpoint.substring(0, this._endpoint.indexOf('/websocket'));
    },

    waitDdpReady (cb) {
        if (this.ddp) {
            cb();
        } else {
            runAfterOtherComputations(() => {
                this.waitDdpReady(cb);
            });
        }
    },

    _cbs: [],
    onChange (cb) {
        this.db.on('change', cb);
        this.ddp.on('connected', cb);
        this.ddp.on('disconnected', cb);
        this.on('loggingIn', cb);
        this.on('change', cb);
    },
    offChange (cb) {
        this.db.off('change', cb);
        this.ddp.off('connected', cb);
        this.ddp.off('disconnected', cb);
        this.off('loggingIn', cb);
        this.off('change', cb);
    },
    on (eventName, cb) {
        this._cbs.push({
            eventName,
            callback: cb,
        });
    },
    off (eventName, cb) {
        this._cbs.splice(this._cbs.findIndex(_cb => _cb.callback === cb && _cb.eventName === eventName), 1);
    },
    notify (eventName) {
        this._cbs.forEach((cb) => {
            if (cb.eventName === eventName && typeof cb.callback === 'function') {
                cb.callback();
            }
        });
    },
    waitDdpConnected (cb) {
        if (this.ddp && this.ddp.status === 'connected') {
            cb();
        } else if (this.ddp) {
            this.ddp.once('connected', cb);
        } else {
            setTimeout(() => { this.waitDdpConnected(cb); }, 10);
        }
    },
};
