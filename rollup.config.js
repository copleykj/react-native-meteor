import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'src/Meteor.js',
        external: ['react'],
        output: {
            name: 'Meteor',
            file: pkg.umd,
            format: 'umd',
        },
        plugins: [
            resolve(),
            babel({
                exclude: ['node_modules/**'],
                plugins: ['@babel/plugin-proposal-class-properties'],
                presets: ['@babel/preset-env', '@babel/preset-react'],
            }),
            commonjs({
                include: 'node_modules/**',
            }),
        ],
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/Meteor.js',
        external: ['trackr', 'ejson', 'wolfy87-eventemitter', 'minimongo-cache', 'react', 'crypto-js'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
        ],
        plugins: [
            babel({
                exclude: ['node_modules/**'],
                plugins: ['@babel/plugin-proposal-class-properties'],
                presets: ['@babel/preset-env', '@babel/preset-react'],
            }),
        ],
    },
];
