// tests/screens.ArchiveScreen.test.tsx
import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ArchiveScreen from 'blank/screens/ArchiveScreen';
import archiveReducer, { archiveAdded } from 'blank/stores/archiveSlice';

function renderWithArchive(ui: React.ReactElement) {
  const store = configureStore({ reducer: { archive: archiveReducer } });
  store.dispatch(
    archiveAdded({ id: 1, userId: 1, todo: 'Archived task', completed: false }),
  );
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
}

describe('ArchiveScreen', () => {
  it('shows archived item and unarchives it', async () => {
    renderWithArchive(<ArchiveScreen />);
    expect(await screen.findByText('Archived task')).toBeTruthy();

    fireEvent.press(screen.getByTestId('unarchive-1'));
    expect(screen.queryByText('Archived task')).toBeNull();
  });
});
