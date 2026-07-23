# @socialize/react-native-meteor

[![react-native-meteor](https://img.shields.io/npm/dm/@socialize/react-native-meteor.svg)](https://www.npmjs.org/package/@socialize/react-native-meteor) [![npm version](https://badge.fury.io/js/%40socialize%2Freact-native-meteor.svg)](https://badge.fury.io/js/%40socialize%2Freact-native-meteor)

A full **Meteor client for React Native** (and plain React/Node), aligned with **Meteor 3.x**: DDP connection with a real reconnect state machine, local Mongo-subset cache with fine-grained reactivity, Promise-first methods and accounts, `useSyncExternalStore`-based hooks, and first-class TypeScript throughout.

Optionally, the [`/model`](#zod-validated-models-model) entry point ports [typed:model](https://github.com/copleykj/meteor-typed-model)'s Zod-validated collections to the client, so one schema file validates on both your Meteor server and your app.

## Why v4

- **TypeScript-native** — the whole package is strict TS with published types; `Collection<T>` and `Model` infer your document types.
- **Meteor 3.x API parity** — `callAsync`/`applyAsync`, async accounts methods, plus conveniences Meteor doesn't have on the client (`subscription.readyPromise`).
- **A serious connection layer** — Meteor's exponential backoff, active heartbeat (detects half-open connections), method re-send on reconnect (`noRetry` opt-out for non-idempotent calls), NetInfo as an input rather than a competing reconnect path.
- **Fine-grained reactivity** — per-key `ReactiveDict` deps, per-collection change events, `useFind` that ignores unrelated writes.
- **Optimistic UI done right** — full update-modifier support with snapshot rollback on server error.
- **Zero abandoned dependencies** — runtime deps are `ejson` and `@noble/hashes`; DDP, minimongo cache, and Tracker are typed, tested, in-package modules (250+ tests against a scripted DDP server).

## Installation

```sh
npm install @socialize/react-native-meteor
# recommended peers for React Native apps:
npm install @react-native-async-storage/async-storage @react-native-community/netinfo react-native-get-random-values
```

## Quick start

```ts
import 'react-native-get-random-values'; // secure ids/tokens (before the package)
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Meteor, { Mongo, useTracker, useSubscribe, useFind } from '@socialize/react-native-meteor';

Meteor.configureOptionalDeps({ Storage: AsyncStorage, NetInfo });
Meteor.connect('wss://myapp.meteor.com/websocket');

const Tasks = new Mongo.Collection<{ _id: string; title: string; done: boolean }>('tasks');

function TaskList() {
    const ready = useSubscribe('tasks.mine');
    const tasks = useFind(() => Tasks.find({}, { sort: { title: 1 } }), []);
    const userId = Meteor.useUserId();
    // ...render
}
```

### Methods & accounts (Meteor 3 style)

```ts
const result = await Meteor.callAsync('tasks.complete', taskId);
await Meteor.applyAsync('charge.card', [amount], { noRetry: true }); // never auto-resent

await Meteor.loginWithPassword('user@example.com', password);
await Meteor.logout();
const { id } = await Accounts.createUser({ email, password });

const handle = Meteor.subscribe('tasks.mine');
await handle.readyPromise; // resolves on ready, rejects if the server denies
```

Legacy v3 callback forms (`Meteor.call`, `loginWithPassword(sel, pw, cb)`, `collection.insert(doc, cb)`, …) still work — see [MIGRATION.md](MIGRATION.md).

### Optimistic writes with rollback

```ts
await Tasks.updateAsync(taskId, { $set: { done: true }, $inc: { edits: 1 } });
// applied to the local cache immediately; rolled back automatically if the server rejects
```

Supported selectors: equality/dotted paths/array containment, `$eq $ne $in $nin $gt $gte $lt $lte $exists $regex $and $or $nor $not $elemMatch $size $mod`. Supported modifiers: `$set $unset $inc $mul $push($each) $pull $pullAll $addToSet($each) $pop $min $max $rename $currentDate`. Anything outside the subset throws a descriptive `Meteor.Error` — escape hatch: `collection.rawCollection`.

## Hooks

| Hook | Purpose |
|---|---|
| `useTracker(fn, deps?, skipUpdate?)` | Run a reactive function; re-render when its result changes |
| `useSubscribe(name \| false, ...params)` | Subscribe for the component lifetime; returns reactive `ready` |
| `useFind(() => cursor, deps?)` | Fetch a cursor; re-renders **only** on that collection's changes |
| `useUser()` / `useUserId()` / `useLoggingIn()` | Reactive account state |
| `useConnectionStatus()` | `{connected, status, retryCount, retryTime}` |

`withTracker` remains for class components.

## Zod-validated Models (`/model`)

Requires `zod@^4` (optional peer — only `/model` users need it). Share one schema file with a Meteor 3 server running [typed:model](https://github.com/copleykj/meteor-typed-model):

```ts
import { z } from 'zod';
import { Model, SchemaHelpers, denyUntrusted, type ModelType } from '@socialize/react-native-meteor/model';

const TaskSchema = SchemaHelpers.withTimestamps(
    z.object({
        title: z.string().min(1),
        done: z.boolean().default(false),
        ownerId: denyUntrusted(z.string()), // client writes fast-fail; server enforces
    }),
);

export const TaskModel = new Model({ name: 'tasks', schema: TaskSchema });
export type Task = ModelType<typeof TaskModel>;

await TaskModel.insertAsync({ title: 'ship v4' }); // validated + defaults applied before any traffic
```

Plain collections can use any [Standard Schema](https://standardschema.dev) validator (Zod, Valibot, ArkType) via `new Mongo.Collection(name, { schema })` — no Zod dependency in the core.

## Connection options

```ts
Meteor.connect(url, {
    autoConnect: true,
    autoReconnect: true,
    reconnectBaseTimeout: 1000, // Meteor's backoff: base × 2.2^n, ±50% jitter, 5min cap
    heartbeatInterval: 17500,   // ping after this much inbound silence
    heartbeatTimeout: 15000,    // recycle the socket if no pong
    SocketConstructor: WebSocket,
});
```

`Meteor.status()`, `Meteor.reconnect()` (skips backoff), `Meteor.disconnect()`.

## Compatibility

React >= 18 (peer). Works in React Native, Expo, plain React, and Node (tests run against a mock DDP server in Node). Storage/NetInfo are injected — the package never imports React Native itself.

## Development

```sh
npm install
npm test            # vitest, incl. DDP protocol transcript tests
npm run lint        # ESLint 9
npm run typecheck   # TypeScript 7 (native)
npm run build       # tsup → dual ESM/CJS
```

## License

MIT — Kelly Copley. Support the project via [GitHub Sponsors](https://github.com/sponsors/copleykj).
