// babel.config.ts

import type { ConfigAPI } from '@babel/core';

export default function (api: ConfigAPI) {
  api.cache.using(() => process.env.NODE_ENV ?? 'development');
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel', 'react-native-worklets/plugin'],
  };
}
