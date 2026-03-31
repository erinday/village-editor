import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['{src,playground/src}/**/*.{js,ts}'],
    plugins: {
      js,
      '@stylistic': stylistic
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      quotes: ['warn', 'single'],
      indent: ['warn', 2],
      'no-multi-spaces': ['warn'],
      'space-before-function-paren': ['error', 'always'],
      semi: ['warn', 'never'],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/member-delimiter-style': ['warn'],
      "@typescript-eslint/no-namespace": 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ]
    },
  },
])
