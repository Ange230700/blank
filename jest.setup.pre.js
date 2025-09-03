// jest.setup.pre.ts

// Mock Expo "winter" runtime early so it never tries to load native bits in Node
jest.mock('expo/src/winter/runtime.native', () => ({}), { virtual: true });
jest.mock('expo/src/winter/runtime', () => ({}), { virtual: true });
