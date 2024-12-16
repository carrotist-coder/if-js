import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      eqeqeq: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-var': 'error',
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  pluginJs.configs.recommended,
];
