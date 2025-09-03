// tests\App.auth-gate.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react-native';

const mockUseAuth: jest.Mock = jest.fn();

jest.mock('blank/stores/authStore', () => {
  const mockHydrate = jest.fn();
  let state: any = {
    user: null,
    loading: false,
    error: undefined,
    hydrate: mockHydrate,
    login: jest.fn(),
    logout: jest.fn(),
  };
  return {
    useAuth: () => state,
    __setMockAuthState: (next: Partial<typeof state>) => {
      state = { ...state, ...next };
    },
  };
});

import App from '../App';

const { __setMockAuthState } = jest.requireMock('blank/stores/authStore');

describe('App auth gate', () => {
  beforeEach(() => {
    __setMockAuthState({ user: null });
  });

  afterEach(() => {
    mockUseAuth.mockReset();
  });

  it('shows Login when no user', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      hydrate: jest.fn(),
      loading: false,
    });

    const { unmount } = render(<App />);

    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();

    unmount();
  });

  it('shows Tabs when user exists', () => {
    __setMockAuthState({ user: { id: 1, username: 'emilys' } });
    mockUseAuth.mockReturnValue({
      user: { id: 1 },
      hydrate: jest.fn(),
      loading: false,
    });

    const { unmount, getAllByText } = render(<App />);

    expect(screen.getByText('Favorites')).toBeTruthy();

    expect(getAllByText('Home').length).toBeGreaterThan(0);

    expect(screen.queryByText('Login')).toBeNull();

    unmount();
  });
});
