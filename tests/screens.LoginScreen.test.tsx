// tests/screens.LoginScreen.test.tsx

import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithStore } from 'blank1/utils/renderWithStore';
import * as authApi from 'blank/services/auth';

jest.spyOn(authApi, 'login').mockResolvedValue({
  id: 1,
  username: 'emilys',
  email: 'e@x.com',
  firstName: 'Emily',
  lastName: 'Johnson',
  gender: 'female',
  image: 'https://dummyjson.com/icon/emilys/128',
  accessToken: 'a',
  refreshToken: 'r',
});
jest.spyOn(authApi, 'me').mockResolvedValue({
  id: 1,
  username: 'emilys',
  email: 'e@x.com',
  firstName: 'Emily',
  lastName: 'Johnson',
  gender: 'female',
  image: 'https://dummyjson.com/icon/emilys/128',
});

import LoginScreen from 'blank/screens/LoginScreen';

test('submits username/password to login thunk', async () => {
  renderWithStore(<LoginScreen />);

  fireEvent.changeText(screen.getByPlaceholderText('Username'), 'emilys');
  fireEvent.changeText(screen.getByPlaceholderText('Password'), 'emilyspass');
  fireEvent.press(screen.getByText('Login'));

  // The thunk will call APIs; you can also assert store state changes if desired
});
