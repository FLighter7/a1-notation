import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
  },
  eslintConfigPrettier,
  {
    // eslint-config-prettier turns "curly" off (it's not a formatting rule,
    // but it can interact with how Prettier prints the block); re-enable it
    // explicitly so every if/else/for/while body is always braced.
    rules: {
      curly: ['error', 'all'],
    },
  },
);
