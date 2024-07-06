module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'MMD_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: true,
        allowUndefined: false,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',

  ],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
};
