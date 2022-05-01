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
    'class-methods-use-this': 0,
    // TODO: find out why these next two aren't working
    'lines-between-class-members': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'no-plusplus': 0,
  },
};
