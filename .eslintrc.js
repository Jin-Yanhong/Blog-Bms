module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:vue/essential', 'google'],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    ignorePatterns: ['**/assets/*'],
    rules: {
        'indent': ['warn', 4, { SwitchCase: 1 }],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'max-len': ['warn', { code: 360 }],
        'linebreak-style': ['warn', 'windows'],
        'object-curly-spacing': ['warn', 'always'],
        'space-before-function-paren': ['warn', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
        'vue/multi-word-component-names': 0,
        'require-jsdoc': 0,
        'valid-jsdoc': 0,
        'no-unused-vars': 0,
        'new-cap': 0,
    },
};
