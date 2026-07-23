// End-to-end check against a REAL Meteor 3 server (see fixture-server.js).
// Usage: METEOR_URL=ws://localhost:3100/websocket node run.mjs
import { WebSocket } from 'ws';
globalThis.WebSocket = WebSocket;
const { default: Meteor, Accounts } = await import('@socialize/react-native-meteor');
const { Model, SchemaHelpers } = await import('@socialize/react-native-meteor/model');
const { z } = await import('zod');

const url = process.env.METEOR_URL ?? 'ws://localhost:3100/websocket';
const waitFor = (cond, ms = 8000) =>
    new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function tick() {
            if (cond()) resolve();
            else if (Date.now() - t0 > ms) reject(new Error('timeout'));
            else setTimeout(tick, 25);
        })();
    });
const step = (n, label) => console.log(`${n}. ${label}`);

Meteor.connect(url);
await waitFor(() => Meteor.status().connected);
step(1, 'connected to real Meteor server');

const sub = Meteor.subscribe('tasks');
await sub.readyPromise;
step(2, 'publication ready');

const username = `e2e_${Date.now()}`;
await Accounts.createUser({ username, password: 'pw-e2e' });
if (!Meteor.userId()) throw new Error('createUser did not log in');
step(3, `createUser + auto-login (real bcrypt round trip): ${Meteor.userId()}`);

await Meteor.logout();
await Meteor.loginWithPassword(username, 'pw-e2e');
step(4, 'loginWithPassword against accounts-password');

await Meteor.loginWithPassword(username, 'WRONG').then(
    () => { throw new Error('wrong password accepted'); },
    (e) => step(5, `wrong password rejected (${e.error})`),
);
await Meteor.loginWithPassword(username, 'pw-e2e');

const TaskSchema = SchemaHelpers.withTimestamps(
    z.object({ _id: z.string().optional(), title: z.string().min(1), done: z.boolean().default(false) }),
);
const TasksModel = new Model({ name: 'tasks', schema: TaskSchema });
const id = await TasksModel.insertAsync({ title: 'e2e task' });
await TasksModel.updateAsync(id, { $set: { done: true } });
await waitFor(() => TasksModel.find({ done: true }).count() >= 1);
step(6, 'Model insert/update with server round trip');
await TasksModel.removeAsync(id);
await TasksModel.insertAsync({ title: '' }).then(
    () => { throw new Error('validation passed'); },
    (e) => step(7, `client-side validation rejected (${e.error})`),
);

const sum = await Meteor.callAsync('e2e.add', 2, 3);
if (sum !== 5) throw new Error(`e2e.add returned ${sum}`);
await Meteor.callAsync('e2e.explode').then(
    () => { throw new Error('explode resolved'); },
    (e) => {
        if (e.error !== 'boom') throw new Error(`wrong error: ${e.error}`);
    },
);
step(8, 'callAsync result + Meteor.Error deserialization');

await Meteor.logout();
Meteor.disconnect();
console.log('E2E ALL GREEN');
process.exit(0);
