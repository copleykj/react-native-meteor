import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, InteractionManager } from 'react-native';
import Meteor, { Mongo, useTracker } from '@socialize/react-native-meteor';
import NetInfo from '@react-native-community/netinfo';
import Storage from '@react-native-community/async-storage';
import { unstable_batchedUpdates as batchedUpdates } from 'react-native/Libraries/Renderer/shims/ReactNative';

Meteor.configureOptionalDeps({ InteractionManager, batchedUpdates, NetInfo, Storage });

Meteor.connect('wss://atmospherejs.com/websocket');
Meteor.subscribe('packages/recent');

const Packages = new Mongo.Collection('packages');

export default function App () {
    const packages = useTracker(() => {
        return Packages.find({}, { sort: { 'latestVersion.published': -1 } });
    });
    return (
        <View style={styles.container}>
            {packages.map(p => {
                return <Text key={p._id}>{p.name}</Text>;
            })}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
