import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
    { ignores: ['dist/', 'coverage/', 'demo/', 'node_modules/'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: { react, 'react-hooks': reactHooks },
        languageOptions: {
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: {
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                setImmediate: 'readonly',
                WebSocket: 'readonly',
                localStorage: 'readonly',
                process: 'writable',
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },
        settings: { react: { version: 'detect' } },
    },
    {
        // Legacy v3 JavaScript awaiting the phased TypeScript rewrite — keep
        // lint useful (real errors) without demanding modern style of code
        // that is scheduled for replacement.
        files: ['src/**/*.js'],
        rules: {
            'no-var': 'off',
            'prefer-rest-params': 'off',
            'prefer-spread': 'off',
            'no-prototype-builtins': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-this-alias': 'off',
        },
    },
);
