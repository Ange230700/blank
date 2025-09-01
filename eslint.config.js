// eslint.config.js

import tseslint from 'typescript-eslint';
import reactNative from '@react-native/eslint-config';
import prettier from 'eslint-config-prettier';
import { globalIgnores } from 'eslint/config';

export default tseslint.config(
    globalIgnores([
        'node_modules',
        'dist',
        '.expo',
        '.expo-shared',
        '.expo-shared/**',
        'web-build',
        'web-build/**',
    ]),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [reactNative, prettier, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
);
