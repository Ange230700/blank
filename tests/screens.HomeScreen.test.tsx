// tests/screens.HomeScreen.test.tsx

import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import { renderWithStore } from 'blank1/utils/renderWithStore';

jest.mock('blank/services/todos', () => ({
  __esModule: true,
  listTodos: jest.fn(async () => ({
    total: 2,
    skip: 0,
    limit: 30,
    todos: [
      { id: 1, userId: 1, todo: 'Write tests', completed: false },
      { id: 2, userId: 1, todo: 'Ship app', completed: true },
    ],
  })),
  toggleTodo: jest.fn(async (_id: number, next: boolean) => ({
    completed: next,
  })),
}));

import HomeScreen from 'blank/screens/HomeScreen';
const todosMock = jest.requireMock('blank/services/todos');

afterEach(() => jest.clearAllMocks());

describe('HomeScreen', () => {
  it('renders todos', async () => {
    renderWithStore(<HomeScreen />);
    await waitFor(() => expect(todosMock.listTodos).toHaveBeenCalled());
    expect(await screen.findByText('Write tests')).toBeTruthy();
    expect(await screen.findByText('Ship app')).toBeTruthy();
  });

  it('toggles a todo using the switch', async () => {
    renderWithStore(<HomeScreen />);
    await waitFor(() => expect(todosMock.listTodos).toHaveBeenCalled());

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
