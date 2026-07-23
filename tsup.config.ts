import { defineConfig } from 'tsup';

export default defineConfig({
    entry: { index: 'src/Meteor.js' },
    format: ['cjs', 'esm'],
    target: 'es2020',
    clean: true,
    sourcemap: true,
    external: ['react', 'trackr', 'ejson', 'wolfy87-eventemitter', 'minimongo-cache', 'crypto-js'],
});
