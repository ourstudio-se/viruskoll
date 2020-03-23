module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      'jsx': true
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript'
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/prop-types': 0,
    'no-empty': 0,
    'no-confusing-arrow': 0,
    'no-underscore-dangle': 0,
    'react/jsx-one-expression-per-line': 0,
    'max-len': 0,
    'no-bitwise': 0,
    'import/prefer-default-export': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      'webpack': {
        'config': './webpack.config.js'
      }
    },
  },
};