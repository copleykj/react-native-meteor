// Server code for the e2e fixture app. CI scaffolds a fresh Meteor 3 app
// (meteor create --minimal), adds accounts-password, and copies this file to
// server/main.js — so the fixture always tests against current Meteor.
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

// The client's optimistic writes call the /tasks/insert|update|remove
// allow-deny methods; permit them for the test collection.
Tasks.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
    insertAsync: () => true,
    updateAsync: () => true,
    removeAsync: () => true,
});

Meteor.publish('tasks', function () {
    return Tasks.find();
});

Meteor.methods({
    'e2e.add': (a, b) => a + b,
    'e2e.explode': () => {
        throw new Meteor.Error('boom', 'Kaboom');
    },
});

Meteor.startup(async () => {
    await Tasks.removeAsync({});
    console.log('e2e fixture ready');
});
