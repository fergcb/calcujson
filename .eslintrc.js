module.exports = {
  extends: 'standard-with-typescript',
  plugins: [
    'jest',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    'jest/globals': true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/restrict-template-expressions': 'off',
    'valid-typeof': ['error', { requireStringLiterals: false }],
  },
}
