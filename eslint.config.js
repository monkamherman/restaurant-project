import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Ajoute les variables globales du navigateur
        ...globals.node, // Ajoute les variables globales de Node.js
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
    ignores: ['node_modules/', 'dist/', 'client/dist/', 'server/manager/dist/'],
  },
];
