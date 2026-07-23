type Listener = (...args: unknown[]) => void;

/**
 * Minimal typed event emitter replacing `wolfy87-eventemitter`.
 *
 * Emission is synchronous: DDP message ordering must be deterministic, so no
 * setTimeout/microtask wrapping happens here. Callers that need async
 * delivery schedule it themselves.
 */
export default class EventEmitter {
    private listeners = new Map<string, Set<Listener>>();

    on(event: string, listener: Listener): this {
        let set = this.listeners.get(event);
        if (!set) {
            set = new Set();
            this.listeners.set(event, set);
        }
        set.add(listener);
        return this;
    }

    once(event: string, listener: Listener): this {
        const wrapper: Listener = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        return this.on(event, wrapper);
    }

    off(event: string, listener?: Listener): this {
        if (!listener) {
            this.listeners.delete(event);
            return this;
        }
        this.listeners.get(event)?.delete(listener);
        return this;
    }

    emit(event: string, ...args: unknown[]): this {
        const set = this.listeners.get(event);
        if (set) {
            // Copy so listeners that unsubscribe (or subscribe) mid-emit
            // don't affect this round of delivery.
            for (const listener of [...set]) {
                listener(...args);
            }
        }
        return this;
    }

    removeAllListeners(): this {
        this.listeners.clear();
        return this;
    }
}
