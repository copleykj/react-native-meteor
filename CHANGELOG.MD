# Change Log

## 4.0.0-beta.1

Complete TypeScript rewrite aligned with Meteor 3.x. See
[MIGRATION.md](MIGRATION.md) for the upgrade guide. Highlights over 3.0.2:

- **TypeScript throughout** with published types; dual ESM/CJS build;
  React >= 18 peer; 250+ tests including DDP protocol transcript tests.
- **DDP**: single reconnect state machine (Meteor backoff parameters),
  active heartbeat detecting half-open connections, method re-send on
  reconnect with `noRetry` opt-out, `updated`/`failed` handling.
- **Meteor 3 API**: `callAsync`/`applyAsync`; async accounts
  (`loginWithToken`, `verifyEmail`, `onLogout` added); subscription
  `readyPromise`; `nosub` errors propagate to `onError`/`onStop`.
- **Data layer**: in-package typed minimongo-subset cache (documented
  selector/modifier subset, loud errors) and Tracker port; per-key
  `ReactiveDict`, new `ReactiveVar`; optimistic writes with snapshot
  rollback and full modifier support.
- **Hooks**: `useTracker` on `useSyncExternalStore` (+`skipUpdate`),
  `useSubscribe`, `useFind` (per-collection granularity), `useUser`,
  `useUserId`, `useLoggingIn`, `useConnectionStatus`.
- **`/model` subpath**: typed:model v2 port — Zod 4 validated,
  type-inferred Models with `denyUntrusted` client fast-fail; core
  stays Zod-free via the Standard Schema interface.
- **Dependencies**: crypto-js, minimongo-cache, trackr,
  wolfy87-eventemitter, base-64 all removed; runtime deps are `ejson` +
  `@noble/hashes`. Zero npm audit advisories in the runtime tree.
- **Fixed v3 bugs**: `ObjectID()` throw, `useTracker` listener leak,
  `ReactiveDict._setObject`, transform bugs, missing update rollback,
  `createUser` state split-brain and options mutation, stale method
  callbacks after reconnect, `process.nextTick` monkey-patch,
  `localStorage` ReferenceError.
- Login token storage key unchanged — existing users stay logged in.

## 4.0.0-alpha.1

First pre-release of the v4 modernization ([full plan & audit](https://github.com/copleykj/react-native-meteor)). Same runtime code as 3.0.2 on an entirely new toolchain:

### Tooling

- Build: tsup (esbuild) replaces Rollup 2 + Babel; ships dual ESM + CJS with source maps and an `exports` map.
- Typechecking: TypeScript 7 (native compiler), with TypeScript 5.9 pinned for API-dependent tools until the 7.1 stable API.
- Lint: ESLint 9 flat config (typescript-eslint, react-hooks) replaces ESLint 7 + babel-eslint; `lint`, `typecheck`, and `test` scripts added.
- Tests: vitest + a mock DDP v1 server harness (`test/helpers/ddp-server.ts`); first smoke tests cover the public API surface and the DDP connect handshake.
- CI: GitHub Actions (lint/typecheck/test/build + `publint`/`arethetypeswrong` on Node 18/20/22); tag-triggered publishing with npm provenance.

### Changed

- `crypto-js` bumped to 4.2 (fixes the critical PBKDF2 advisory; we only use SHA-256, which is unchanged).
- Removed the unused `base-64` dependency; regenerated the lockfile (npm lockfileVersion 3).
- `react` peer dependency widened from `^16.13.1` to `>=18`.
- Package no longer commits `dist/`; deprecated `prepublish` replaced with `prepublishOnly`.

### Known/expected

- `minimongo-cache` (and its vulnerable `lodash`) remains until the Phase 3 cache rewrite; `trackr` and `wolfy87-eventemitter` remain until Phases 1–3.

## 3.0.2

### Bug Fixes

- Fix missing default selector in `Collection.find` method.

## 3.0.1

### Bug Fixes

- Fixes string based selectors in findOne method of collection.

## 3.0.0

This is a marjor release due to changes that were necessary to fix use of the package outside of React Native.

### New Features

- Added `configureOptionalDeps` as alternative to conditional imports, so that parts that React Native requires can be added as necessary.

### Bug Fixes & Breaking Changes

- removed use of conditional imports to deal with bundlers such as webpack.

## V2.0.1

### Bug Fixes

- Rolled back crypto-js version to fix crypo module trying to load outside node environment

## v2.0.0

### New Features

- Added `useTracker` hook
- Updated `withTracker` to make use of `useTracker` hook
- Package can now be used outside of React Native environment, such as in a web browser.

### Breaking Changes

- NetInfo and AsyncStorage moved to `@react-native-community` packages.
- Collection.`find()` now always returns a cursor. Use Collection.`find()`.`fetch()` as you would in your Meteor app.

### Bug Fixes

- Fixed issue with MongoId being undefined becuase it was being added to the global scope and some bundlers wrap files.
- Fixed issue where Minimongo's batchedUpdates function was set to undefined when not in a React Native environment.

## v1.3.5

### Bug Fixes

- Fix Bug in Collection.findOne()
- handle $unset in changed event

## v1.3.4

### Bug Fixes

- Fixed update/remove selector issue
