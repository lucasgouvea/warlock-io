module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'p5js',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'import/no-import-module-exports': 0,
    'import/extensions': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
  },
};
