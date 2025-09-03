// jest.setup.ts

jest.setTimeout(15000);

try {
  require('@testing-library/react-native/extend-expect');
} catch {
  try {
    require('@testing-library/jest-native/extend-expect');
  } catch {
    // If neither exists, continue without extra matchers
  }
}

try {
  // Available in react-native-gesture-handler v2+
  require('react-native-gesture-handler/jestSetup');
} catch {
  /* noop */
}

jest.useRealTimers();

try {
  require.resolve('react-native-reanimated');
  jest.mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock'),
  );
} catch {
  /* noop */
}

try {
  require.resolve('react-native/Libraries/Animated/NativeAnimatedHelper');
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch {
  /* noop */
}

// -- SecureStore minimal mock
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(async () => null),
  setItemAsync: jest.fn(async () => {}),
  deleteItemAsync: jest.fn(async () => {}),
}));

// -- Vector icons stub
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return { Ionicons: (props: any) => React.createElement('Icon', props) };
});

jest.mock('react-native/Libraries/Components/Pressable/Pressable', () => {
  const React = require('react');
  const { View } = require('react-native');

  const PressableMock = React.forwardRef(
    ({ children, ...props }: any, ref: any) =>
      React.createElement(View, { ...props, ref }, children),
  );
  PressableMock.displayName = 'Pressable';

  return PressableMock;
});
