// tests\utils\renderWithStore.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';

import auth from 'blank/stores/slices/authSlice';
import favs from 'blank/stores/slices/favsSlice';

const rootReducer = combineReducers({
  auth,
  favs,
});
export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    // TS will accept Partial here, you just need to cast
    preloadedState: preloadedState as RootState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export function renderWithStore(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
  }: {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
  } = {},
) {
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
}
