// babel.config.js
export default function (api) {
  const isJest = api.caller(
    (c) => typeof c?.name === 'string' && c.name.includes('babel-jest'),
  );
  api.cache.using(() => (isJest ? 'jest' : 'app'));

  if (isJest) {
    return { presets: ['babel-preset-expo'], plugins: [] };
  }

  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: ['react-native-reanimated/plugin'],
  };
}
