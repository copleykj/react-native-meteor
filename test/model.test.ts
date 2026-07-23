import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { z } from 'zod';
import Meteor from '../src/Meteor';
import { Model, SchemaHelpers, denyUntrusted, type ModelType } from '../src/model';
import { MockDDPServer } from './helpers/ddp-server';

function waitFor(condition: () => boolean, timeoutMs = 2000): Promise<void> {
    return new Promise((resolve, reject) => {
        const started = Date.now();
        const tick = () => {
            if (condition()) return resolve();
            if (Date.now() - started > timeoutMs) return reject(new Error('waitFor timed out'));
            setTimeout(tick, 5);
        };
        tick();
    });
}

const TaskSchema = SchemaHelpers.withTimestamps(
    z.object({
        _id: z.string().optional(),
        title: z.string().min(1),
        done: z.boolean().default(false),
        priority: denyUntrusted(z.number().default(0)),
    }),
);

describe('Model (typed:model port)', () => {
    let server: MockDDPServer;
    let TaskModel: Model<typeof TaskSchema.shape>;

    beforeEach(async () => {
        server = new MockDDPServer();
        Meteor.connect(server.endpoint, { SocketConstructor: server.SocketConstructor });
        await waitFor(() => Meteor.status().connected);
        TaskModel = new Model({ name: `tasks_${Math.random().toString(36).slice(2)}`, schema: TaskSchema });
    });

    afterEach(() => {
        Meteor.disconnect();
        server.stop();
    });

    async function ackNextMethod(result: unknown = null) {
        const method = await server.nextMessage('method');
        server.send({ msg: 'result', id: method.id, result });
    }

    it('insertAsync validates, applies schema defaults, and stores the validated doc', async () => {
        const insert = TaskModel.insertAsync({ title: 'write tests' });
        void ackNextMethod('ok');
        const id = await insert;
        const doc = await TaskModel.findOneAsync(id);
        expect(doc).toBeDefined();
        expect(doc!.title).toBe('write tests');
        expect(doc!.done).toBe(false); // zod default applied
        expect(doc!.createdAt).toBeInstanceOf(Date); // helper timestamp filled
    });

    it('insertAsync rejects invalid documents with validation-error before any traffic', async () => {
        await expect(TaskModel.insertAsync({ title: '' })).rejects.toMatchObject({ error: 'validation-error' });
        expect(server.messages.filter((m) => m.msg === 'method')).toHaveLength(0);
    });

    it('updateAsync validates the post-modifier document', async () => {
        const insert = TaskModel.insertAsync({ title: 'a' });
        void ackNextMethod('ok');
        const id = await insert;
        await expect(TaskModel.updateAsync(id, { $set: { title: '' } })).rejects.toMatchObject({
            error: 'validation-error',
        });
    });

    it('denyUntrusted fields fast-fail on insert and update without hitting the wire', async () => {
        await expect(TaskModel.insertAsync({ title: 'x', priority: 9 } as never)).rejects.toMatchObject({
            error: 'protected-field',
        });
        const insert = TaskModel.insertAsync({ title: 'ok' });
        void ackNextMethod('ok');
        const id = await insert;
        const methodCountBefore = server.messages.filter((m) => m.msg === 'method').length;
        await expect(TaskModel.updateAsync(id, { $set: { priority: 5 } })).rejects.toMatchObject({
            error: 'protected-field',
        });
        await expect(TaskModel.updateAsync(id, { $inc: { 'priority.sub': 1 } })).rejects.toMatchObject({
            error: 'protected-field', // dotted paths resolve to the top-level field
        });
        expect(server.messages.filter((m) => m.msg === 'method')).toHaveLength(methodCountBefore);
    });

    it('upsertAsync updates when a match exists, inserts otherwise', async () => {
        const first = TaskModel.upsertAsync({ title: 'unique' }, { $set: { done: true } });
        void ackNextMethod('ok'); // insert path
        const { insertedId } = await first;
        expect(insertedId).toBeDefined();

        const second = TaskModel.upsertAsync(insertedId!, { $set: { done: false } });
        void ackNextMethod(1); // update path
        await expect(second).resolves.toEqual({ numberAffected: 1 });
        const doc = await TaskModel.findOneAsync(insertedId!);
        expect(doc!.done).toBe(false);
    });

    it('find returns a typed cursor; ModelType extracts the document type', async () => {
        const insert = TaskModel.insertAsync({ title: 'typed' });
        void ackNextMethod('ok');
        await insert;
        const docs = TaskModel.find({ title: 'typed' }).fetch();
        expect(docs).toHaveLength(1);
        // Type-level assertion: ModelType infers the schema output type.
        type Task = ModelType<typeof TaskModel>;
        const task: Task = docs[0]!;
        expect(task.title).toBe('typed');
    });
});
