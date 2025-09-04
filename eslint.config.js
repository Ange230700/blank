// eslint.config.js

import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  // Ignore stuff we don’t lint
  {
    ignores: [
      'node_modules',
      'dist',
      '.expo',
      '.expo-shared',
      'web-build',
      'web-build/**',
      'babel.config.js',
      'metro.config.*',
      'jest.config.*',
      'jest.setup.*',
      'commitlint.config.*',
      'eslint.config.*',
      'tests/mocks/emptyModule.js',
      'tests/mocks/reanimated.js',
      'public',
      'coverage',
    ],
  },

  // React Native shareable config converted to flat
  ...compat.extends('@react-native/eslint-config'),

  prettierConfig,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.es2021, jest: true, node: true },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // surface formatting problems
      'prettier/prettier': 'warn',

      // prefer TS version; disable base rule
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
