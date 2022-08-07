module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'p5js',
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
