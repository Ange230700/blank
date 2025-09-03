// jest.setup.js
import 'react-native-gesture-handler/jestSetup.js'; // include .js to satisfy Node ESM
import '@testing-library/jest-native/extend-expect';

// Reanimated: use the official mock in tests
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
