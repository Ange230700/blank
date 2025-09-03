// babel.config.js
export default function (api) {
  // Detect if Babel is called by jest (no env vars)
  const isJest = api.caller(
    (c) => typeof c?.name === 'string' && c.name.includes('babel-jest'),
  );
  api.cache.using(() => (isJest ? 'jest' : 'app'));

  if (isJest) {
    // Keep tests simple; no NativeWind preset, no Reanimated plugin
    return { presets: ['babel-preset-expo'], plugins: [] };
  }

  // App / web builds
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'], // NativeWind is a PRESET
    plugins: ['react-native-reanimated/plugin'], // must be last
  };
}
