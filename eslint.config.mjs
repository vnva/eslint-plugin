import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import stylisticPlugin from '@stylistic/eslint-plugin';

const CONFIG = [
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  {
    rules: {
      'no-console': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-underscore-dangle': 'error',
      'object-shorthand': 'error',
    },
  },
  {
    plugins: { '@stylistic': stylisticPlugin },
    rules: {
      // ESLint stylistic rules
      ...stylisticPlugin.configs.customize({ semi: true, braceStyle: '1tbs', arrowParens: true }).rules,
      '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
      '@stylistic/max-len': ['warn', { code: 120, ignoreComments: false, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/object-curly-newline': 'error',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
];

export default CONFIG;
