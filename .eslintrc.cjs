/* eslint-env node */

module.exports = {
  root: true,
  plugins: ['@stylistic'],
  ignorePatterns: ['/node_modules', '/assets', '**/public'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/strongly-recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
    './eslint/script-config.cjs',
    './eslint/vue-config.cjs',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: false,
    },
  },
};
