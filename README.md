

# @socialize/react-native-meteor
 [![react-native-meteor](http://img.shields.io/npm/dm/@socialize/react-native-meteor.svg)](https://www.npmjs.org/package/@socialize/react-native-meteor) [![npm version](https://badge.fury.io/js/%40socialize%2Freact-native-meteor.svg)](https://badge.fury.io/js/%40socialize%2Freact-native-meteor) [![Dependency Status](https://david-dm.org/copleykj/react-native-meteor/status.svg)](https://david-dm.org/copleykj/react-native-meteor) [![Gitter Chat](https://img.shields.io/gitter/room/SocializeJs/Lobby.svg)](https://gitter.im/SocializeJs/Lobby)

 This project was adapted from [react-native-meteor](https://github.com/inProgress-team/react-native-meteor) by inProgress Team to be more up to date and focused. This documentation has been revised to be more coherent, dependencies have been updated, and the API has been brought more in-line with Meteor.

 If you are moving from that package to this one, you may find certain parts are missing that were deemed to be outside the scope of this package (ListViews), were removed/deprecated in meteor core or are outdated methods of connecting Tracker with your componenets (connectMeteor, composeWithTracker and createContainer).

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [@socialize/react-native-meteor](#socializereact-native-meteor)
	- [Supporting the Project](#supporting-the-project)
	- [Installation and Setup](#installation-and-setup)
		- [Android](#android)
	- [Example usage](#example-usage)
- [Reactive variables](#reactive-variables)
- [API](#api)
	- [Meteor Collections](#meteor-collections)
	- [Meteor DDP connection](#meteor-ddp-connection)
		- [Meteor.connect(url, options)](#meteorconnecturl-options)
			- [Meteor.ddp](#meteorddp)
		- [Meteor.disconnect()](#meteordisconnect)
	- [Meteor methods](#meteor-methods)
	- [Additional packages](#additional-packages)
		- [ReactiveDict](#reactivedict)
		- [Accounts](#accounts)
		- [React Meteor Data](#react-meteor-data)
- [Contribution](#contribution)

<!-- /TOC -->

## Supporting the Project
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

Litecoin: LXLBD9sC5dV79eQkwj7tFusUHvJA5nhuD3 / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation and Setup

```sh
$ npm i --save @socialize/react-native-meteor
```

### Android

Add the following permission to your AndroidManifest.xml file for faster reconnects to the DDP server when your device reconnects to the network.

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

If running an android emulator you have to forward the port of your meteor app.

```shell
$ adb reverse tcp:3000 tcp:3000
```

## Example usage

```javascript

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import TodosCollection from '../api/todo';

Meteor.connect('ws://192.168.X.X:3000/websocket');//do this only once

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

---

# Reactive variables

These variables can be used inside `withTracker`. They will be populated into your component if they change.

* [Meteor.subscribe()](http://docs.meteor.com/#/full/meteor_subscribe)
* Meteor.collection(collectionName, options)
  * [.find(selector, options)](http://docs.meteor.com/#/full/find)
  * [.findOne(selector, options)](http://docs.meteor.com/#/full/findone)
* [Meteor.user()](http://docs.meteor.com/#/full/meteor_user)
* [Meteor.userId()](http://docs.meteor.com/#/full/meteor_userid)
* [Meteor.status()](http://docs.meteor.com/#/full/meteor_status)
* [Meteor.loggingIn()](http://docs.meteor.com/#/full/meteor_loggingin)
* [ReactiveDict()](https://atmospherejs.com/meteor/reactive-dict)

---

# API

## Meteor Collections

* Meteor.collection(collectionName, options)
  * [.insert(doc, callback)](http://docs.meteor.com/#/full/insert)
  * [.update(id, modifier, [options], [callback])](http://docs.meteor.com/#/full/update)
  * [.remove(id, callback(err, countRemoved))](http://docs.meteor.com/#/full/remove)

These methods (except update) work offline. That means that elements are correctly updated offline, and when you reconnect to ddp, Meteor calls are taken care of.

You need pass the `cursoredFind` option when you get your collection if you want to use cursor-like method:

```‍‍‍javascript
Meteor.collection("collectionName", { cursoredFind: true })
```

Or you can simply use `find()` to get an array of documents. The option default to false for backward compatibility. Cursor methods are available to share code more easily between a react-native app and a standard Meteor app.


## Meteor DDP connection

### Meteor.connect(url, options)

Connect to a DDP server. You only have to do this once in your app.

*Arguments*

- `url` **string** *required*
- `options` **object** Available options are :
  - autoConnect **boolean** [true] whether to establish the connection to the server upon instantiation. When false, one can manually establish the connection with the Meteor.ddp.connect method.
  - autoReconnect **boolean** [true] whether to try to reconnect to the server when the socket connection closes, unless the closing was initiated by a call to the disconnect method.
  - reconnectInterval **number** [10000] the interval in ms between reconnection attempts.

#### Meteor.ddp

Once connected to the ddp server, you can access every method available in [ddp.js](https://github.com/mondora/ddp.js/).
* Meteor.ddp.on('connected')
* Meteor.ddp.on('added')
* Meteor.ddp.on('changed')

### Meteor.disconnect()

Disconnect from the DDP server.

## Meteor methods

* [Meteor.call](http://docs.meteor.com/#/full/meteor_call)
* [Meteor.loginWithPassword](http://docs.meteor.com/#/full/meteor_loginwithpassword) (Please note that user is auto-resigned in - like in Meteor Web applications - thanks to React Native AsyncStorage.)
* [Meteor.logout](http://docs.meteor.com/#/full/meteor_logout)
* [Meteor.logoutOtherClients](http://docs.meteor.com/#/full/meteor_logoutotherclients)

## Additional packages

### ReactiveDict

`import { reactivedict } from 'react-native-meteor';`

See [documentation](https://atmospherejs.com/meteor/reactive-dict).


### Accounts

`import { Accounts } from 'react-native-meteor';`

* [Accounts.createUser](http://docs.meteor.com/#/full/accounts_createuser)
* [Accounts.changePassword](http://docs.meteor.com/#/full/accounts_forgotpassword)
* [Accounts.forgotPassword](http://docs.meteor.com/#/full/accounts_changepassword)
* [Accounts.resetPassword](http://docs.meteor.com/#/full/accounts_resetpassword)
* [Accounts.onLogin](http://docs.meteor.com/#/full/accounts_onlogin)
* [Accounts.onLoginFailure](http://docs.meteor.com/#/full/accounts_onloginfailure)

### React Meteor Data

`import { withTracker } from 'react-native-meteor';`

See [documentation](https://atmospherejs.com/meteor/react-meteor-data).

---

# Contribution

Pull Requests and issues reported are welcome! :)
