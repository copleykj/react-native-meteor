import EventEmitter from '../lib/emitter';
import EJSON from '../lib/ejson';
import '../lib/mongo-id'; // register the EJSON `oid` type before any parsing

/**
 * What we require of a WebSocket instance. Kept internal (and applied via a
 * cast) because browser/RN/mock WebSocket typings differ in event-handler
 * signatures, which mutable properties make invariant — any real WebSocket
 * implementation satisfies this at runtime.
 */
interface WebSocketLike {
    onopen: (() => void) | null;
    onclose: (() => void) | null;
    onerror: ((error: unknown) => void) | null;
    onmessage: ((event: { data: unknown }) => void) | null;
    send(data: string): void;
    close(): void;
}

/** Any WebSocket-compatible constructor: global WebSocket, mock-socket's, ws's. */
export type SocketConstructor = new (endpoint: string) => object;

/**
 * Thin EJSON-speaking wrapper around a WebSocket. Events: `open`, `close`,
 * `error`, `message` (parsed object). One Socket instance corresponds to one
 * WebSocket lifetime; the connection state machine creates a fresh one per
 * attempt, so stale sockets can never deliver events into a new attempt.
 */
export default class Socket extends EventEmitter {
    private rawSocket: WebSocketLike | null = null;
    private closed = false;

    constructor(
        private readonly SocketConstructor: SocketConstructor,
        private readonly endpoint: string,
    ) {
        super();
    }

    open(): void {
        if (this.rawSocket) return;
        this.rawSocket = new this.SocketConstructor(this.endpoint) as WebSocketLike;
        this.rawSocket.onopen = () => this.emit('open');
        this.rawSocket.onerror = (error) => this.emit('error', error);
        this.rawSocket.onclose = () => {
            if (this.closed) return;
            this.closed = true;
            this.emit('close');
        };
        this.rawSocket.onmessage = (event) => {
            let message: unknown;
            try {
                message = EJSON.parse(String(event.data));
            } catch {
                return; // ignore malformed frames
            }
            this.emit('message', message);
        };
    }

    send(message: object): void {
        this.rawSocket?.send(EJSON.stringify(message));
    }

    close(): void {
        if (this.closed) return;
        this.closed = true;
        const socket = this.rawSocket;
        this.rawSocket = null;
        if (socket) {
            // Detach handlers first: some WebSocket implementations fire
            // onclose synchronously from close(), and this socket's lifetime
            // is over either way — the state machine decides what's next.
            socket.onopen = null;
            socket.onclose = null;
            socket.onerror = null;
            socket.onmessage = null;
            try {
                socket.close();
            } catch {
                // already dead
            }
        }
        this.emit('close');
    }
}
