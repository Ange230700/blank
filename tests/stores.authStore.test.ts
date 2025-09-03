// tests\stores.authStore.test.ts

import { act } from '@testing-library/react-native';
import { useAuth } from 'blank/stores/authStore';

// Mock the network services used by the store
jest.mock('blank/services/auth', () => ({
  login: jest.fn(async () => ({
    id: 1,
    username: 'emilys',
    email: 'emily.johnson@x.dummyjson.com',
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'female',
    image: 'https://dummyjson.com/icon/emilys/128',
    accessToken: 'a',
    refreshToken: 'r',
  })),
  me: jest.fn(async () => ({
    id: 1,
    username: 'emilys',
    email: 'emily.johnson@x.dummyjson.com',
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'female',
    image: 'https://dummyjson.com/icon/emilys/128',
  })),
  logout: jest.fn(async () => {}),
}));

describe('authStore', () => {
  beforeEach(() => {
    // reset store between tests
    useAuth.setState({ user: null, loading: false, error: undefined });
    jest.clearAllMocks();
  });

  it('hydrate loads /auth/me', async () => {
    await act(async () => {
      await useAuth.getState().hydrate();
    });
    expect(useAuth.getState().user?.username).toBe('emilys');
    expect(useAuth.getState().loading).toBe(false);
  });

  it('login stores user and clears loading', async () => {
    await act(async () => {
      await useAuth.getState().login('emilys', 'emilyspass');
    });
    expect(useAuth.getState().user?.id).toBe(1);
    expect(useAuth.getState().error).toBeUndefined();
    expect(useAuth.getState().loading).toBe(false);
  });

  it('logout clears user', async () => {
    await act(async () => {
      await useAuth.getState().login('emilys', 'emilyspass');
      await useAuth.getState().logout();
    });
    expect(useAuth.getState().user).toBeNull();
  });
});
