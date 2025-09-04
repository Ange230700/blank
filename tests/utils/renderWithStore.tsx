// tests/utils/renderWithStore.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';

import archive from 'blank/stores/archiveSlice';

export function setupStore() {
  return configureStore({
    reducer: { archive }, // ✅ include required slice(s)
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export function renderWithStore(
  ui: React.ReactElement,
  { store = setupStore() }: { store?: AppStore } = {},
) {
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
}
