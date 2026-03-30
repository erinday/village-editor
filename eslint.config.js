import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      quotes: ['warn', 'single'],
      indent: ['warn', 2],
      'no-multi-spaces': ['warn'],
      'space-before-function-paren': ['error', 'always'],
      semi: ['warn', 'never'],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/member-delimiter-style': ['warn']
    },
  },
  tseslint.configs.recommended,
])
