// tests\screens.HomeScreen.test.tsx

import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import { renderWithStore } from 'blank1/utils/renderWithStore';

// ---- favs store mock (keep or remove; not needed if using Redux slice)
jest.mock('blank/stores/favsStore', () => ({
  __esModule: true,
  useFavs: () => ({ togglePin: jest.fn(), isPinned: () => false }),
}));

// ---- todos service mock
jest.mock('blank/services/todos', () => ({
  __esModule: true,
  listTodosByUser: jest.fn(async () => ({
    total: 2,
    skip: 0,
    limit: 30,
    todos: [
      { id: 1, userId: 1, todo: 'Write tests', completed: false },
      { id: 2, userId: 1, todo: 'Ship app', completed: true },
    ].map((t) => ({ ...t })),
  })),
  toggleTodo: jest.fn(async (_id: number, next: boolean) => ({
    completed: next,
  })),
}));

import HomeScreen from 'blank/screens/HomeScreen';
const todosMock = jest.requireMock('blank/services/todos');

jest.setTimeout(20000);
afterEach(() => jest.clearAllMocks());

const preloaded = {
  auth: {
    user: {
      id: 1,
      username: 'emilys',
      email: 'e@x.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      image: 'https://dummyjson.com/icon/emilys/128',
    },
    loading: false,
    error: undefined,
  },
  favs: { pinnedIds: {} },
};

describe('HomeScreen', () => {
  it('renders user todos', async () => {
    renderWithStore(<HomeScreen />, { preloadedState: preloaded });

    await waitFor(
      () => expect(todosMock.listTodosByUser).toHaveBeenCalledWith(1, 30, 0),
      { timeout: 10000 },
    );

    expect(await screen.findByText('Write tests')).toBeTruthy();
    expect(await screen.findByText('Ship app')).toBeTruthy();
  });

  it('toggles a todo using the switch', async () => {
    renderWithStore(<HomeScreen />, { preloadedState: preloaded });

    await waitFor(() => expect(todosMock.listTodosByUser).toHaveBeenCalled(), {
      timeout: 10000,
    });

    await screen.findByText('Write tests');
    let switches = screen.getAllByRole('switch');
    expect(switches[0]).toHaveProp('value', false);

    fireEvent(switches[0], 'valueChange', true);

    await waitFor(() => {
      switches = screen.getAllByRole('switch');
      expect(switches[0]).toHaveProp('value', true);
    });

    expect(todosMock.toggleTodo).toHaveBeenCalledWith(1, true);
  });
});
