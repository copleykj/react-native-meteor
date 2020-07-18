# @socialize/react-native-meteor

 [![react-native-meteor](https://img.shields.io/npm/dm/@socialize/react-native-meteor.svg)](https://www.npmjs.org/package/@socialize/react-native-meteor) [![npm version](https://badge.fury.io/js/%40socialize%2Freact-native-meteor.svg)](https://badge.fury.io/js/%40socialize%2Freact-native-meteor) [![Dependency Status](https://david-dm.org/copleykj/react-native-meteor/status.svg)](https://david-dm.org/copleykj/react-native-meteor)

 This project was adapted from [react-native-meteor](https://github.com/inProgress-team/react-native-meteor) by inProgress Team to be more up to date and focused. This documentation has been revised to be more coherent, dependencies have been updated, and the API has been brought closely in-line with Meteor.

 If you are moving from that package to this one, you may find certain parts are missing which were deemed to be outside the scope of this package (ListViews), they were removed/deprecated in meteor core, or they are outdated methods of connecting Tracker with your componenets (connectMeteor, composeWithTracker and createContainer).

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Supporting The Project](#supporting-the-project)
- [Installation And Setup](#installation-and-setup)
  - [React Native](#react-native)
  - [Android](#android)
- [Example Usage](#example-usage)
  - [withTracker](#withtracker)
  - [useTracker](#usetracker)
- [External Usage](#external-usage)
- [Reactive Data Sources](#reactive-data-sources)
- [API](#api)
  - [Subscriptions](#subscriptions)
  - [Collections](#collections)
  - [Meteor.is/Environment/](#meteorisenvironment)
- [DDP connection](#ddp-connection)
  - [Meteor.connect(url, options)](#meteorconnecturl-options)
    - [Arguments](#arguments)
  - [Meteor.ddp](#meteorddp)
  - [Meteor.disconnect()](#meteordisconnect)
- [Meteor Methods](#meteor-methods)
- [Additional Packages](#additional-packages)
  - [ReactiveDict](#reactivedict)
  - [Accounts](#accounts)
  - [React Meteor Data](#react-meteor-data)
- [Development](#development)
- [Contribution](#contribution)

<!-- /TOC -->

## Supporting The Project

Finding the time to maintain FOSS projects can be quite difficult. I am myself responsible for over 30 personal projects across 2 platforms, as well as Multiple others maintained by the [Meteor Community Packages](https://github.com/meteor-community-packages) organization. Therfore, if you appreciate my work, I ask that you either sponsor my work through GitHub, or donate via Paypal or Patreon. Every dollar helps give cause for spending my free time fielding issues, feature requests, pull requests and releasing updates. Info can be found in the "Sponsor this project" section of the [GitHub Repo](https://github.com/copleykj/react-native-meteor)

## Installation And Setup

```sh
npm i --save @socialize/react-native-meteor
```

### React Native

When using this package with React Native you will need to install the `netinfo` and `async-storage` plugins provided by `@react-native-community`

```sh
npm i --save @react-native-community/netinfo @react-native-community/async-storage
```

### Android

Add the following permission to your AndroidManifest.xml file for faster reconnects to the DDP server when your device reconnects to the network.

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

If running an android emulator you have to forward the port of your meteor app.

```shell
adb reverse tcp:3000 tcp:3000
```

## Example Usage

### withTracker

```javascript

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import TodosCollection from '../api/todo';

Meteor.connect('ws://192.168.X.X:3000/websocket'); //do this only once

class App extends Component {
  renderRow(todo) {
    return (
      <Text>{todo.title}</Text>
    );
  }
  render() {
    const { todos, todosReady } = this.props;

    return(
      <View>
          {todosReady ? todos.map(renderRow) : <View>Loading...</View>}
      </View>
    )
  }
}

export default withTracker(params=>{
  return {
    todosReady: Meteor.subscribe('todos').ready(),
    todos: TodosCollection.find({done: false}, { sort: { createdAt: -1 }}),
  };
})(App);
```

### useTracker

```javascript

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import TodosCollection from '../api/todo';

Meteor.connect('ws://192.168.X.X:3000/websocket'); //do this only once

const renderRow = (todo) => {
  return (
    <Text>{todo.title}</Text>
  );
}
export default () => {
  const { todos, todosReady } = useTracker(() => {
    return {
      todosReady: Meteor.subscribe('todos').ready(),
      todos: TodosCollection.find({done: false}, { sort: { createdAt: -1 }}),
    };
  });

  return(
    <View>
        {todosReady ? todos.map(renderRow) : <View>Loading...</View>}
    </View>
  )
}
```

## External Usage

I've put a bit of time into being able to make use of this package outside of React Native. I can't guarantee perfection, but it seems to work well within a CodeSandbox project. Feel free to fork the following sandbox and give it a go.

[![Edit @socialize/react-native-meteor Test Sandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/socializereact-native-meteor-test-sandbox-by9ly?fontsize=14&hidenavigation=1&theme=dark)

---

## Reactive Data Sources

These reactive sources can be used inside `withTracker` and `useTracker`. They will be populated into your component if they change.

- [Meteor.subscribe()](https://docs.meteor.com/api/pubsub.html#Meteor-subscribe)
- [Mongo.Collection(collectionName, options)](https://docs.meteor.com/api/collections.html#Mongo-Collection)
  - [.find(selector, options)](https://docs.meteor.com/api/collections.html#Mongo-Collection-find)
  - [.fndOne(selector, options)](https://docs.meteor.com/api/collections.html#Mongo-Collection-findOne)
- [Meteor.user()](https://docs.meteor.com/api/accounts.html#Meteor-user)
- [Meteor.userId()](https://docs.meteor.com/api/accounts.html#Meteor-userId)
- [Meteor.loggingIn()](https://docs.meteor.com/api/accounts.html#Meteor-loggingIn)
- [Meteor.status()](https://docs.meteor.com/api/connections.html#Meteor-status)
- [ReactiveDict()](https://docs.meteor.com/api/reactive-dict.html)

---

## API

### Subscriptions

- [Meteor.subscribe()](https://docs.meteor.com/api/pubsub.html#Meteor-subscribe)

```javascript
import Meteor, { Tracker } from '@socialize/react-native-meteor';

const handle = Meteor.subscribe('socialize.friends');

Tracker.autorun(() =>{
    if(handle.ready()){
        console.log('Subscription ready...');
        handle.stop();
    }
});
```

### Collections

Collections work almost exactly like they do inside your Meteor app. To create a new collection you call `new Mongo.Collection('collectionName', options)`. Currently only the `transform` option will be used. If you are sharing code between apps, other options will be ignored. The only potential issue that may arise here is if you use the `connection` option. Only the default connection is currently supported. If you have use for multiple connections, PR's and FR's are welcome.

- Mongo.Collection(collectionName, options)
  - [.find(selector, options)](https://docs.meteor.com/api/collections.html#Mongo-Collection-find)
  - [.fndOne(selector, options)](https://docs.meteor.com/api/collections.html#Mongo-Collection-findOne)
  - [.insert(doc, callback)](https://docs.meteor.com/api/collections.html#Mongo-Collection-insert)
  - [.update(id, modifier, [options], [callback])](https://docs.meteor.com/api/collections.html#Mongo-Collection-update)
  - [.remove(id, callback(err, countRemoved))](https://docs.meteor.com/api/collections.html#Mongo-Collection-remove)

These methods work offline. That means that elements are correctly updated offline, and when you reconnect to ddp, Meteor calls are taken care of.

```javascript
import { Mongo } from '@socialize/react-native-meteor';
import { Widget } from './models/widget';

let WidgetsCollection = Mongo.Collection("widgets", {
  transform: (document) => {
    //make our documents instances of the Widget class
    return new Widget(document);
  }
});

const aWidget = WidgetsCollection.findOne();

const cursorOfWidgets = WidgetsCollection.find();

const arrayOfWidgets = WidgetsCollection.find().fetch();
```


### Meteor.is/Environment/

Keeping in line with Meteor's API, `isClient` is provided as well as a `isReactNative`, similar to how Meteor provides `isCordova` when code is running in a cordova build. `isServer` and `isCordova` are not provided as they will still be falsey when checking. These properties allow for code reuse across your codebases.

- Meteor.isClient - True
- Meteor.isReactNative - True

## DDP connection

### Meteor.connect(url, options)

Connect to a DDP server. You only have to do this once in your app.

#### Arguments

- `url` **string** *required*
- `options` **object** Available options are :
  - autoConnect **boolean** [true] whether to establish the connection to the server upon instantiation. When false, one can manually establish the connection with the Meteor.ddp.connect method.
  - autoReconnect **boolean** [true] whether to try to reconnect to the server when the socket connection closes, unless the closing was initiated by a call to the disconnect method.
  - reconnectInterval **number** [10000] the interval in ms between reconnection attempts.

### Meteor.ddp

Once connected to the ddp server, you can access every method available in [ddp.js](https://github.com/mondora/ddp.js/).

- Meteor.ddp.on('connected')
- Meteor.ddp.on('added')
- Meteor.ddp.on('changed')

### Meteor.disconnect()

Disconnect from the DDP server.

## Meteor Methods

- [Meteor.call](http://docs.meteor.com/#/full/meteor_call)

## Additional Packages

### ReactiveDict

```javascript
import { reactivedict } from 'react-native-meteor';
```

See [documentation](https://atmospherejs.com/meteor/reactive-dict).

### Accounts

```javascript
import Meteor, { Accounts } from 'react-native-meteor';
```

- [Accounts.createUser](http://docs.meteor.com/#/full/accounts_createuser)
- [Accounts.changePassword](http://docs.meteor.com/#/full/accounts_forgotpassword)
- [Accounts.forgotPassword](http://docs.meteor.com/#/full/accounts_changepassword)
- [Accounts.resetPassword](http://docs.meteor.com/#/full/accounts_resetpassword)
- [Accounts.onLogin](http://docs.meteor.com/#/full/accounts_onlogin)
- [Accounts.onLoginFailure](http://docs.meteor.com/#/full/accounts_onloginfailure)
- [Meteor.user()](http://docs.meteor.com/#/full/meteor_user)
- [Meteor.userId()](http://docs.meteor.com/#/full/meteor_userid)
- [Meteor.loggingIn()](http://docs.meteor.com/#/full/meteor_loggingin)
- [Meteor.loginWithPassword](http://docs.meteor.com/#/full/meteor_loginwithpassword) (Please note that user is auto-resigned in - like in Meteor Web applications - thanks to React Native AsyncStorage.)
- [Meteor.logout](http://docs.meteor.com/#/full/meteor_logout)
- [Meteor.logoutOtherClients](http://docs.meteor.com/#/full/meteor_logoutotherclients)

### React Meteor Data

```javascript
import { withTracker, useTracker} from 'react-native-meteor';
```

See Meteor's  [react-meteor-data documentation](https://atmospherejs.com/meteor/react-meteor-data) for more info.

---

## Development

This package uses Rollup.js as it's bundler. Run `npm install --only=dev` to install dev dependencies and then run `npm run dev` to bundle the package and watch for changes.

For single, unwatched builds use `npm run build`

For developing and testing locally in a React Native project, you can use [wml](https://www.npmjs.com/package/wml) to link this package to your React Native project.

## Contribution

Eslint configurations are provided for sanity. After cloning, you can run `npm install --only=dev`. This will install all necessary dependencies to enable linting in your code editor such as vscode.

Pull Requests, Feature Requests, and Bug Reports are welcome!
