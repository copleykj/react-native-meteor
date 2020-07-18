# Change Log

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
