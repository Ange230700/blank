// jest.setup.js
import 'react-native-gesture-handler/jestSetup.js';
import '@testing-library/jest-native/extend-expect';
jest.setTimeout(15000);

// Reanimated: use the official mock in tests
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
