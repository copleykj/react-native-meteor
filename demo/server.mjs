// Minimal DDP v1 dev server so the demo runs without a Meteor deployment:
//   node server.mjs   (ws://localhost:3000/websocket)
// Speaks just enough DDP: connect, ping/pong, tasks pub/sub, collection
// methods, and a toy login that accepts any credentials.
import { WebSocketServer } from 'ws';

const tasks = new Map(); // id -> {title, done}
let seq = 0;
const wss = new WebSocketServer({ port: 3000, path: '/websocket' });
const subscribers = new Map(); // ws -> subId

const send = (ws, msg) => ws.send(JSON.stringify(msg));
const broadcast = (msg) => {
    for (const [ws] of subscribers) send(ws, msg);
};

wss.on('connection', (ws) => {
    ws.on('close', () => subscribers.delete(ws));
    ws.on('message', (raw) => {
        const msg = JSON.parse(String(raw));
        switch (msg.msg) {
            case 'connect':
                send(ws, { msg: 'connected', session: `s${++seq}` });
                break;
            case 'ping':
                send(ws, { msg: 'pong', id: msg.id });
                break;
            case 'sub':
                if (msg.name === 'tasks') {
                    subscribers.set(ws, msg.id);
                    for (const [id, fields] of tasks) {
                        send(ws, { msg: 'added', collection: 'tasks', id, fields });
                    }
                    send(ws, { msg: 'ready', subs: [msg.id] });
                } else {
                    send(ws, { msg: 'nosub', id: msg.id, error: { error: 404, reason: `No publication '${msg.name}'`, isClientSafe: true } });
                }
                break;
            case 'unsub':
                subscribers.delete(ws);
                send(ws, { msg: 'nosub', id: msg.id });
                break;
            case 'method': {
                const [arg1, arg2] = msg.params ?? [];
                let result = null;
                let error;
                if (msg.method === '/tasks/insert') {
                    const { _id, ...fields } = arg1;
                    tasks.set(_id, fields);
                    broadcast({ msg: 'added', collection: 'tasks', id: _id, fields });
                    result = _id;
                } else if (msg.method === '/tasks/update') {
                    const existing = tasks.get(arg1._id);
                    const set = arg2.$set ?? {};
                    if (existing) {
                        Object.assign(existing, set);
                        broadcast({ msg: 'changed', collection: 'tasks', id: arg1._id, fields: set });
                        result = 1;
                    } else {
                        error = { error: 404, reason: 'Task not found', isClientSafe: true };
                    }
                } else if (msg.method === '/tasks/remove') {
                    tasks.delete(arg1._id);
                    broadcast({ msg: 'removed', collection: 'tasks', id: arg1._id });
                    result = 1;
                } else if (msg.method === 'login') {
                    result = { id: `user-${arg1?.user?.username ?? arg1?.user?.email ?? 'resumed'}`, token: arg1?.resume ?? `tok-${Date.now()}` };
                } else if (msg.method === 'logout') {
                    result = null;
                } else {
                    error = { error: 404, reason: `Method '${msg.method}' not found`, isClientSafe: true };
                }
                send(ws, { msg: 'updated', methods: [msg.id] });
                send(ws, { msg: 'result', id: msg.id, ...(error ? { error } : { result }) });
                break;
            }
        }
    });
});

console.log('Demo DDP server listening on ws://localhost:3000/websocket');
