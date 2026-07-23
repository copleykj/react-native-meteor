import 'react-native-get-random-values';
import React, { useState } from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { z } from 'zod';
import Meteor, { useConnectionStatus, useFind, useLoggingIn, useSubscribe, useUserId } from '@socialize/react-native-meteor';
import { Model, SchemaHelpers, type ModelType } from '@socialize/react-native-meteor/model';

Meteor.configureOptionalDeps({ Storage: AsyncStorage, NetInfo });

// Start the dev server first: node server.mjs
// Android emulators reach the host machine via 10.0.2.2.
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
Meteor.connect(`ws://${HOST}:3000/websocket`);

const TaskSchema = SchemaHelpers.withTimestamps(
    z.object({
        _id: z.string().optional(),
        title: z.string().min(1, 'Title required'),
        done: z.boolean().default(false),
    }),
);
const TaskModel = new Model({ name: 'tasks', schema: TaskSchema });
type Task = ModelType<typeof TaskModel> & { _id: string };

export default function App() {
    const status = useConnectionStatus();
    const userId = useUserId();
    const loggingIn = useLoggingIn();
    const ready = useSubscribe('tasks');
    const tasks = useFind(() => TaskModel.find({}, { sort: { createdAt: -1 } }), []) as Task[];
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = async () => {
        try {
            setError(null);
            await TaskModel.insertAsync({ title });
            setTitle('');
        } catch (e) {
            setError((e as Error).message);
        }
    };

    const toggle = (task: Task) =>
        TaskModel.updateAsync(task._id, { $set: { done: !task.done } }).catch((e: Error) => setError(e.message));

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.header}>react-native-meteor v4 demo</Text>
            <Text style={status.connected ? styles.ok : styles.bad}>
                {status.connected ? '● connected' : `● ${status.status} (retry ${status.retryCount})`}
                {ready ? ' · sub ready' : ' · sub loading'}
            </Text>
            <View style={styles.row}>
                {userId ? (
                    <Button title={`Logout (${userId})`} onPress={() => Meteor.logout()} />
                ) : (
                    <Button
                        title={loggingIn ? 'Logging in…' : 'Login as demo'}
                        onPress={() => Meteor.loginWithPassword('demo', 'password').catch((e: Error) => setError(e.message))}
                    />
                )}
            </View>
            <View style={styles.row}>
                <TextInput style={styles.input} placeholder="New task…" value={title} onChangeText={setTitle} onSubmitEditing={addTask} />
                <Button title="Add" onPress={addTask} />
            </View>
            {error ? <Text style={styles.bad}>{error}</Text> : null}
            <FlatList
                data={tasks}
                keyExtractor={(task) => task._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.task} onPress={() => toggle(item)} onLongPress={() => TaskModel.removeAsync(item._id)}>
                        <Text style={item.done ? styles.done : undefined}>
                            {item.done ? '☑' : '☐'} {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No tasks yet — add one. Tap toggles, long-press deletes.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 64, backgroundColor: '#fff' },
    header: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
    ok: { color: '#2a7', marginBottom: 8 },
    bad: { color: '#c33', marginBottom: 8 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
    task: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
    done: { textDecorationLine: 'line-through', color: '#999' },
    empty: { color: '#999', marginTop: 24, textAlign: 'center' },
});
