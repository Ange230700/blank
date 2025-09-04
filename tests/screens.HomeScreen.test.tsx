// tests/screens.HomeScreen.test.tsx
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import { renderWithStore } from 'blank1/utils/renderWithStore';

// Mock the todos service
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
    id: _id,
    userId: 1,
    todo: _id === 1 ? 'Write tests' : 'Ship app',
    completed: next,
  })),
}));

jest.mock('blank/ui/responsive', () => ({
  useGridColumns: () => 1,
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
    expect(todosMock.listTodos).toHaveBeenCalled();
  });

  it('toggles a todo using the switch (via testID)', async () => {
    renderWithStore(<HomeScreen />);
    await screen.findByText('Write tests');

    const sw = await screen.findByTestId('todo-switch-1');
    expect(sw).toHaveProp('value', false);

    fireEvent(sw, 'valueChange', true);

    await waitFor(() => {
      expect(screen.getByTestId('todo-switch-1')).toHaveProp('value', true);
    });
    expect(todosMock.toggleTodo).toHaveBeenCalledWith(1, true);
  });

  it('filters with tabs using testIDs', async () => {
    renderWithStore(<HomeScreen />);
    await screen.findByText('Write tests');

    // Start at "all"
    expect(await screen.findByText('Write tests')).toBeTruthy();
    expect(await screen.findByText('Ship app')).toBeTruthy();

    // Show completed
    fireEvent.press(screen.getByTestId('filter-completed'));

    // "Write tests" is pending → should disappear
    await waitFor(() => {
      expect(screen.queryByText('Write tests')).toBeNull();
      expect(screen.getByText('Ship app')).toBeTruthy();
    });

    // Show pending
    fireEvent.press(screen.getByTestId('filter-pending'));
    await waitFor(() => {
      expect(screen.getByText('Write tests')).toBeTruthy();
      expect(screen.queryByText('Ship app')).toBeNull();
    });
  });
});
