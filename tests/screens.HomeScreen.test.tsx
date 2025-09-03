// tests\screens.HomeScreen.test.tsx

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

// ---- auth store mock (stable user + no-op hydrate)
jest.mock('blank/stores/authStore', () => ({
  __esModule: true,
  useAuth: () => ({
    user: { id: 1, username: 'emilys' },
    loading: false,
    error: undefined,
    hydrate: jest.fn(),
  }),
}));

// ---- favs store mock (no-op)
jest.mock('blank/stores/favsStore', () => ({
  __esModule: true,
  useFavs: () => ({ togglePin: jest.fn(), isPinned: () => false }),
}));

// ---- todos service mock (named exports only; no default)
jest.mock('blank/services/todos', () => ({
  __esModule: true,
  listTodosByUser: jest.fn(async () => ({
    total: 2,
    skip: 0,
    limit: 30,
    todos: [
      { id: 1, userId: 1, todo: 'Write tests', completed: false },
      { id: 2, userId: 1, todo: 'Ship app', completed: true },
    ].map((t) => ({ ...t })), // fresh refs each call
  })),
  toggleTodo: jest.fn(async (_id: number, next: boolean) => ({
    completed: next,
  })),
}));

import HomeScreen from 'blank/screens/HomeScreen';

// Get handles to the mocked fns in a Jest-safe way
const todosMock = jest.requireMock('blank/services/todos');

jest.setTimeout(20000);
afterEach(() => jest.clearAllMocks());

describe('HomeScreen', () => {
  it('renders user todos', async () => {
    render(<HomeScreen />);

    // Wait until the effect calls the service
    await waitFor(
      () => expect(todosMock.listTodosByUser).toHaveBeenCalledWith(1, 30, 0),
      { timeout: 10000 },
    );

    // Then items should be present
    expect(await screen.findByText('Write tests')).toBeTruthy();
    expect(await screen.findByText('Ship app')).toBeTruthy();
  });

  it('toggles a todo using the switch', async () => {
    render(<HomeScreen />);

    // Ensure data loaded
    await waitFor(() => expect(todosMock.listTodosByUser).toHaveBeenCalled(), {
      timeout: 10000,
    });

    // First switch corresponds to "Write tests"
    await screen.findByText('Write tests');
    let switches = screen.getAllByRole('switch');
    expect(switches[0]).toHaveProp('value', false);

    // Flip it
    fireEvent(switches[0], 'valueChange', true);

    // UI should reflect the change
    await waitFor(() => {
      switches = screen.getAllByRole('switch');
      expect(switches[0]).toHaveProp('value', true);
    });

    expect(todosMock.toggleTodo).toHaveBeenCalledWith(1, true);
  });
});
