import { defineConfig } from 'tsup';

export default defineConfig({
    entry: { index: 'src/Meteor.js', model: 'src/model/index.ts' },
    format: ['cjs', 'esm'],
    target: 'es2020',
    clean: true,
    sourcemap: true,
});
