// jest.config.js

export default {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.pre.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^blank/(.*)$': '<rootDir>/src/$1',
    '^react-native-reanimated$': '<rootDir>/tests/mocks/reanimated.js',
    '^expo(?:/.*)?$': '<rootDir>/tests/mocks/emptyModule.js',
    '^react$': '<rootDir>/node_modules/react',
    '^react-test-renderer$': '<rootDir>/node_modules/react-test-renderer',
    '^react-native/Libraries/Components/Pressable/Pressable$':
      'react-native/Libraries/Components/Touchable/TouchableOpacity',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-native-.*|@react-navigation/.*|@rneui/.*|expo-modules-core|react-native-reanimated)/)',
  ],
};
