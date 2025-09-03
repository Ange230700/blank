// tests/screens.LoginScreen.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

const mockLogin: jest.Mock = jest.fn();

jest.mock('blank/stores/authStore', () => ({
  useAuth: () => ({ login: mockLogin, loading: false, error: undefined }),
}));

import LoginScreen from 'blank/screens/LoginScreen';

describe('LoginScreen', () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it('submits username/password to login', () => {
    render(<LoginScreen />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'emilys');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'emilyspass');
    fireEvent.press(screen.getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith('emilys', 'emilyspass');
  });
});
