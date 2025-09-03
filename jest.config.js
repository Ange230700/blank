// jest.config.js

export default {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^blank/(.*)$': '<rootDir>/src/$1',
  },
};
