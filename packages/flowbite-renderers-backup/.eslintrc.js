/* eslint-env node */
/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
