# Change Log

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
