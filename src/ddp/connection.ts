import EventEmitter from '../lib/emitter';
import Socket, { type SocketConstructor } from './socket';

const DDP_VERSION = '1';

/**
 * Reconnect/backoff parameters matching Meteor core's retry defaults.
 * Heartbeat parameters match Meteor's DDP heartbeat defaults.
 */
export interface DDPOptions {
    endpoint: string;
    SocketConstructor: SocketConstructor;
    autoConnect?: boolean;
    autoReconnect?: boolean;
    /** First retry delay in ms (default 1000). `reconnectInterval` is the legacy v3 alias. */
    reconnectBaseTimeout?: number;
    /** Legacy v3 option name for reconnectBaseTimeout. */
    reconnectInterval?: number;
    reconnectMaxTimeout?: number;
    reconnectExponent?: number;
    /** Fraction of deviation applied to each delay, default 0.5 (±50%). */
    reconnectJitter?: number;
    /** Send a ping after this much inbound silence (default 17500ms). */
    heartbeatInterval?: number;
    /** Close the connection if a ping goes unanswered this long (default 15000ms). */
    heartbeatTimeout?: number;
}

export type DDPStatus = 'connected' | 'connecting' | 'disconnected' | 'waiting' | 'offline' | 'failed';

interface DDPServerMessage {
    msg?: string;
    id?: string;
    session?: string;
    version?: string;
    [key: string]: unknown;
}

/** DDP server messages re-emitted as events, verbatim. */
const PUBLIC_EVENTS = ['ready', 'nosub', 'added', 'changed', 'removed', 'result', 'updated', 'error'] as const;

interface OutstandingMethod {
    message: { msg: 'method'; id: string; method: string; params: unknown[] };
    /** Sent on the current session and awaiting `result`. */
    sent: boolean;
    /** Never re-send after a connection drop; fail the call instead. */
    noRetry: boolean;
}

/**
 * DDP v1 connection with a single-owner reconnect state machine.
 *
 * State transitions:
 *
 *   disconnected → connecting → connected
 *                      ↓ (close/error/failed handshake)
 *                   waiting (exponential backoff) → connecting → …
 *
 *   offline: entered via networkOnline(false) or disconnect(); no retries
 *   until networkOnline(true) / connect() / reconnect().
 *
 * Liveness: replies to server pings, and actively pings after
 * `heartbeatInterval` of inbound silence, closing the socket (and thus
 * triggering the reconnect path) if no traffic arrives within
 * `heartbeatTimeout` — this is what detects half-open TCP connections.
 *
 * Reliability: method calls are kept in an outbox until their `result`
 * arrives; on reconnect, unacked methods are re-sent in order (Meteor's
 * documented client behavior). Subscriptions are restarted by the layer
 * above (Meteor.subscribe owns subscription records until Phase 4 moves
 * them here).
 */
export default class DDP extends EventEmitter {
    status: DDPStatus = 'disconnected';
    autoReconnect: boolean;
    private readonly initialAutoReconnect: boolean;
    retryCount = 0;

    private readonly endpoint: string;
    private readonly SocketConstructor: SocketConstructor;
    private readonly baseTimeout: number;
    private readonly maxTimeout: number;
    private readonly exponent: number;
    private readonly jitter: number;
    private readonly heartbeatInterval: number;
    private readonly heartbeatTimeout: number;

    private socket: Socket | null = null;
    private methodOutbox = new Map<string, OutstandingMethod>();
    private pendingMessages: object[] = [];
    private retryTimer: ReturnType<typeof setTimeout> | null = null;
    private heartbeatTimer: ReturnType<typeof setTimeout> | null = null;
    private pingTimeoutTimer: ReturnType<typeof setTimeout> | null = null;
    private nextUniqueId = 0;
    /** ms timestamp of the next scheduled retry, for status reporting. */
    retryTime: number | null = null;

    constructor(options: DDPOptions) {
        super();
        this.endpoint = options.endpoint;
        this.SocketConstructor = options.SocketConstructor;
        this.autoReconnect = options.autoReconnect !== false;
        this.initialAutoReconnect = this.autoReconnect;
        this.baseTimeout = options.reconnectBaseTimeout ?? options.reconnectInterval ?? 1000;
        this.maxTimeout = options.reconnectMaxTimeout ?? 5 * 60 * 1000;
        this.exponent = options.reconnectExponent ?? 2.2;
        this.jitter = options.reconnectJitter ?? 0.5;
        this.heartbeatInterval = options.heartbeatInterval ?? 17500;
        this.heartbeatTimeout = options.heartbeatTimeout ?? 15000;

        if (options.autoConnect !== false) {
            this.connect();
        }
    }

    // ---- public API --------------------------------------------------------

    /** Open a connection now (also clears offline/failed state and restores auto-reconnection). */
    connect(): void {
        if (this.status === 'connected' || this.status === 'connecting') return;
        this.autoReconnect = this.initialAutoReconnect;
        this.clearRetryTimer();
        this.openSocket();
    }

    /** Deliberate disconnect: no auto-reconnection until connect() is called. */
    disconnect(): void {
        this.autoReconnect = false;
        this.clearRetryTimer();
        this.stopHeartbeat();
        this.setStatus('offline');
        this.teardownSocket();
        this.emit('disconnected');
    }

    /** Force an immediate reconnect attempt, skipping any pending backoff. */
    reconnect(): void {
        this.retryCount = 0;
        if (this.status === 'connected') return;
        this.clearRetryTimer();
        this.openSocket();
    }

    /**
     * Network-state input (e.g. from NetInfo). Offline pauses retries;
     * regained connectivity skips the remaining backoff.
     */
    networkOnline(online: boolean): void {
        if (!online) {
            if (this.status === 'connected' || this.status === 'connecting') {
                this.teardownSocket();
                this.stopHeartbeat();
                this.emit('disconnected');
            }
            this.clearRetryTimer();
            this.setStatus('offline');
        } else if (this.status === 'offline' && this.autoReconnect) {
            this.retryCount = 0;
            this.openSocket();
        }
    }

    method(name: string, params: unknown[], options?: { noRetry?: boolean }): string {
        const id = this.uniqueId();
        const message = { msg: 'method' as const, id, method: name, params };
        this.methodOutbox.set(id, {
            message,
            sent: this.status === 'connected',
            noRetry: options?.noRetry === true,
        });
        this.sendOrQueue(message);
        return id;
    }

    sub(name: string, params: unknown[]): string {
        const id = this.uniqueId();
        this.sendOrQueue({ msg: 'sub', id, name, params });
        return id;
    }

    unsub(id: string): string {
        this.sendOrQueue({ msg: 'unsub', id });
        return id;
    }

    statusInfo(): { connected: boolean; status: DDPStatus; retryCount: number; retryTime: number | null } {
        return {
            connected: this.status === 'connected',
            status: this.status,
            retryCount: this.retryCount,
            retryTime: this.retryTime,
        };
    }

    // ---- connection lifecycle ---------------------------------------------

    private openSocket(): void {
        this.teardownSocket();
        this.setStatus('connecting');

        const socket = new Socket(this.SocketConstructor, this.endpoint);
        this.socket = socket;

        socket.on('open', () => {
            socket.send({ msg: 'connect', version: DDP_VERSION, support: [DDP_VERSION] });
        });
        socket.on('error', () => {
            // A close event follows (or the socket never opens); the close
            // handler owns rescheduling. Surface the error for observers.
            this.emit('socketError');
        });
        socket.on('close', () => {
            if (this.socket !== socket) return; // stale socket from a previous attempt
            this.handleConnectionLost();
        });
        socket.on('message', (raw) => {
            if (this.socket !== socket) return;
            this.handleMessage(raw as DDPServerMessage);
        });

        socket.open();
    }

    private handleConnectionLost(): void {
        this.socket = null;
        this.stopHeartbeat();
        this.setStatus('disconnected');
        // Methods that were sent but unacked will be re-sent on reconnect —
        // except noRetry methods, which fail now with a synthetic result so
        // callers can decide whether repeating them is safe.
        for (const [id, outstanding] of [...this.methodOutbox]) {
            if (outstanding.noRetry && outstanding.sent) {
                this.methodOutbox.delete(id);
                this.emit('result', {
                    msg: 'result',
                    id,
                    error: { error: 'connection-lost', reason: 'Connection lost before method result was received', isClientSafe: true },
                });
            } else {
                outstanding.sent = false;
            }
        }
        this.emit('disconnected');
        if (this.autoReconnect) {
            this.scheduleRetry();
        }
    }

    private scheduleRetry(): void {
        this.clearRetryTimer();
        const delay = this.retryDelay(this.retryCount);
        this.retryCount += 1;
        this.retryTime = Date.now() + delay;
        this.setStatus('waiting');
        this.retryTimer = setTimeout(() => {
            this.retryTimer = null;
            this.retryTime = null;
            this.openSocket();
        }, delay);
    }

    /** Meteor's retry curve: base * exponent^count, capped, with ±jitter. */
    retryDelay(count: number): number {
        const timeout = Math.min(this.maxTimeout, this.baseTimeout * Math.pow(this.exponent, count));
        return timeout * (1 + this.jitter * (2 * Math.random() - 1));
    }

    private handleMessage(message: DDPServerMessage): void {
        this.noteInboundTraffic();

        switch (message.msg) {
            case 'connected':
                this.retryCount = 0;
                this.setStatus('connected');
                this.flushOutbox();
                this.emit('connected');
                break;
            case 'failed':
                // Version negotiation failed; retrying cannot help.
                this.autoReconnect = false;
                this.setStatus('failed');
                this.teardownSocket();
                this.emit('error', new Error(`DDP version negotiation failed; server requested version ${String(message.version)}`));
                break;
            case 'ping':
                this.send({ msg: 'pong', ...(message.id !== undefined ? { id: message.id } : {}) });
                break;
            case 'pong':
                this.clearPingTimeout();
                break;
            case 'result':
                if (typeof message.id === 'string') {
                    this.methodOutbox.delete(message.id);
                }
                this.emit('result', message);
                break;
            default:
                if ((PUBLIC_EVENTS as readonly string[]).includes(message.msg ?? '')) {
                    this.emit(message.msg as string, message);
                }
        }
    }

    // ---- outgoing messages -------------------------------------------------

    private sendOrQueue(message: object): void {
        if (this.status === 'connected') {
            this.send(message);
        } else {
            this.pendingMessages.push(message);
        }
    }

    private send(message: object): void {
        this.socket?.send(message);
    }

    private flushOutbox(): void {
        // Unacked methods first (in insertion order), then everything queued
        // while offline. Method messages queued in pendingMessages are also
        // tracked in the outbox, so skip them there to avoid double-send.
        for (const outstanding of this.methodOutbox.values()) {
            if (!outstanding.sent) {
                outstanding.sent = true;
                this.send(outstanding.message);
            }
        }
        const pending = this.pendingMessages;
        this.pendingMessages = [];
        for (const message of pending) {
            if ((message as { msg?: string }).msg === 'method') continue; // sent via outbox above
            this.send(message);
        }
    }

    // ---- heartbeat ---------------------------------------------------------

    private noteInboundTraffic(): void {
        this.clearPingTimeout();
        this.stopHeartbeatTimer();
        if (this.heartbeatInterval <= 0) return;
        this.heartbeatTimer = setTimeout(() => {
            this.heartbeatTimer = null;
            if (this.status !== 'connected') return;
            this.send({ msg: 'ping' });
            this.pingTimeoutTimer = setTimeout(() => {
                // Half-open connection: no pong, no traffic. Kill the socket;
                // the close handler drives reconnection.
                this.pingTimeoutTimer = null;
                this.socket?.close();
            }, this.heartbeatTimeout);
        }, this.heartbeatInterval);
    }

    private stopHeartbeat(): void {
        this.stopHeartbeatTimer();
        this.clearPingTimeout();
    }

    private stopHeartbeatTimer(): void {
        if (this.heartbeatTimer) {
            clearTimeout(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    private clearPingTimeout(): void {
        if (this.pingTimeoutTimer) {
            clearTimeout(this.pingTimeoutTimer);
            this.pingTimeoutTimer = null;
        }
    }

    // ---- helpers -----------------------------------------------------------

    private teardownSocket(): void {
        const socket = this.socket;
        this.socket = null;
        socket?.removeAllListeners();
        socket?.close();
    }

    private clearRetryTimer(): void {
        if (this.retryTimer) {
            clearTimeout(this.retryTimer);
            this.retryTimer = null;
        }
        this.retryTime = null;
    }

    private setStatus(status: DDPStatus): void {
        this.status = status;
    }

    private uniqueId(): string {
        return String(this.nextUniqueId++);
    }
}
