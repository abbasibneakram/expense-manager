module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  rules: {
    // Place to specify ESLint rules.
    // Can be used to overwrite rules specified from the extended configs
    'prettier/prettier': 'error', // Ensures that Prettier errors are reported as ESLint errors
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
