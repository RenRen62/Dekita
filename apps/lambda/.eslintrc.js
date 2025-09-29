const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, 'tsconfig.json'),
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, 'tsconfig.json'),
        alwaysTryTypes: true
      }
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc'
        }
      }
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false
      }
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: false,
        allowBoolean: false,
        allowAny: false,
        allowNullish: false,
        allowRegExp: false
      }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    'max-params': ['error', 3]
  },
  plugins: ['import', '@typescript-eslint'],
  overrides: [
    {
      files: ['!**/*test*'],
      extends: ['plugin:functional/recommended'],
      plugins: ['functional'],
      rules: {
        'functional/prefer-immutable-types': 'off',
        'functional/no-expression-statements': 'off'
      }
    }
  ]
};
