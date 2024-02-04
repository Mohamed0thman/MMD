module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-native', 'import'],
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'warn',
    'react-native/no-single-element-style-arrays': 'warn',
    'import/order': ['warn', {'newlines-between': 'always'}],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: true,
    },
  },
};
