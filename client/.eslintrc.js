module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['react-app', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'no-unused-vars': 'warn',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
    },
};
