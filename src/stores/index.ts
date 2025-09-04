// src/stores/index.ts
import { configureStore } from '@reduxjs/toolkit';
import archive from 'blank/stores/archiveSlice';

export const store = configureStore({
  reducer: { archive },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
