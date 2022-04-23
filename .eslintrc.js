module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['airbnb-typescript/base'],
      parserOptions: {
        project: './mario-clone-ts/tsconfig.json',
      },
    },
  ],
  rules: {
    'linebreak-style': 0,
  },
};
