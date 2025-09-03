// babel.config.js

export default function (api) {
  // cache based on NODE_ENV + whether we're in Jest
  const isJest = !!process.env.JEST_WORKER_ID;
  api.cache.using(
    () => `${process.env.NODE_ENV ?? 'development'}|jest=${isJest}`,
  );

  return {
    presets: ['babel-preset-expo'],

    // These plugins are great for the app, but can break Jest when it compiles
    // react-native/jest/setup.js and other node_modules files.
    // Only include them outside of Jest.
    plugins: isJest ? [] : ['nativewind/babel', 'react-native-worklets/plugin'],

    // (optional) If you prefer, you can also do:
    // env: { test: { plugins: [] } }
  };
}
