const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  env: {
    es2022: true,
    node: true,
    'react-native/react-native': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-native/all',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: ['import', '@typescript-eslint', 'react-native'],
  settings: {
    'import/resolver': {
      typescript: { project },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    'import/ignore': ['react-native'],
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', 'src/apis/bin'],
  rules: {
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' }
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
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            message: 'Please use Text from @/components/bases instead',
            importNames: ['Text']
          }
        ]
      }
    ],
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/sort-styles': 'off',
    'max-params': ['error', 3]
  }
};
