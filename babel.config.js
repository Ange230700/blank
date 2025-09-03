// babel.config.js
export default function (api) {
  api.cache.forever();

  return {
    // NativeWind is a preset; keep it with Expo
    presets: ['babel-preset-expo', 'nativewind/babel'],

    // Apply Reanimated plugin only to your source files so Jest / node_modules aren't affected
    overrides: [
      {
        test: [
          './src/**/*',
          './App.tsx',
          './App.jsx',
          './index.ts',
          './index.tsx',
          './index.js',
        ],
        // Reanimated plugin MUST be last (within this list)
        plugins: ['react-native-reanimated/plugin'],
      },
    ],
  };
}
