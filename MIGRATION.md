# Migrating from v3 to v4

v4 is a ground-up TypeScript rewrite aligned with Meteor 3.x. The v3 API
largely still works — callback forms are kept as thin wrappers — but the
Promise-first API is now canonical.

**Users stay logged in across the upgrade**: the login token storage key is
unchanged.

## Requirements

- React >= 18 (peer dependency; v3 declared `^16.13.1`)
- React Native >= 0.72 recommended (optional peer)
- For secure random ids/tokens, install `react-native-get-random-values`
  (or use Expo's crypto polyfill) and import it before this package.

## API changes

| v3 | v4 |
|---|---|
| `Meteor.call(name, ..., cb)` | Still works; prefer `await Meteor.callAsync(name, ...)` / `Meteor.applyAsync(name, args, { noRetry })` |
| `Meteor.loginWithPassword(sel, pw, cb)` | Still works; returns a `Promise<LoginResult>` now |
| — | `Meteor.loginWithToken(token)` (public token login) |
| `Accounts.createUser/changePassword/forgotPassword/resetPassword(..., cb)` | Still work; all return Promises; `Accounts.verifyEmail(token)` added |
| — | `Accounts.onLogout(cb)` hook |
| `collection.insert/update/remove(..., cb)` | Still work; prefer `insertAsync`/`updateAsync`/`removeAsync` |
| `Meteor.subscribe(...)` handle | Same shape, plus `handle.readyPromise` (resolves on ready, rejects on `nosub` error) |
| `Meteor.status()` | Now also reports `retryCount` and `retryTime` |
| `configureOptionalDeps({...})` | Unchanged signature; `batchedUpdates` and `isReactNative` are now no-ops (React 18 auto-batches) |
| `withTracker` / `useTracker` | Same API; rebuilt on `useSyncExternalStore`. `useTracker` gains an optional `skipUpdate` comparator |
| — | New hooks: `useSubscribe`, `useFind`, `useUser`, `useUserId`, `useLoggingIn`, `useConnectionStatus` |
| — | `ReactiveVar`; `ReactiveDict` gains `delete`, `clear`, `all`, per-key reactivity |
| — | `Collection<T>` generics + optional `schema` (Standard Schema: Zod 4/Valibot/ArkType) |
| — | `@socialize/react-native-meteor/model`: typed:model port (requires `zod@^4`) |

## Behavioral changes

- **Reconnection** is a single state machine with Meteor's exponential
  backoff (1s base → 5min cap, jittered) and an **active heartbeat** that
  detects dead connections. v3's fixed 10s timer / 3s debounce / NetInfo
  race is gone. `Meteor.reconnect()` skips the backoff.
- **Method calls survive reconnects**: unacked methods are re-sent (v3
  silently dropped them). Pass `noRetry: true` to `applyAsync` for
  non-idempotent methods — those fail on connection loss instead.
- **Optimistic updates roll back on server error** for insert, update
  *and* remove (v3 never rolled back updates), and `update` accepts the
  full modifier subset (`$set $unset $inc $mul $push $pull $pullAll
  $addToSet $pop $min $max $rename $currentDate`), not just `$set`.
- **Query support** is a documented Mongo subset; unsupported operators
  throw a descriptive `Meteor.Error` instead of silently misbehaving.
  Escape hatch: `collection.rawCollection`.
- **Reactivity is finer-grained**: `ReactiveDict` invalidates per key;
  `useFind` re-renders only on its own collection's changes.
- Subscription `nosub` errors now reach `onError`/`onStop` (v3 only
  logged a warning).

## Fixed v3 bugs (no action needed, but behavior may differ)

`new Mongo.ObjectID()` no longer throws; `useTracker` no longer leaks a
listener per render; `ReactiveDict.set(object)` sets the right keys;
transforms apply correctly in `find`; `Accounts.createUser` no longer
mutates your options object and its login state is now visible via
`Meteor.userId()`; stale method callbacks can no longer swallow results
after a reconnect.

## Removed

- Internal `_login` (was broken), `Meteor.getData()` internals reshaped
  (`Data` is not public API).
- `crypto-js`, `minimongo-cache`, `trackr`, `wolfy87-eventemitter`,
  `base-64` dependencies (replaced in-package / with `@noble/hashes`).
