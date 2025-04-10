import { next } from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';

export default [
  ...next(),
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettier,
];
