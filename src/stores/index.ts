// src\stores\index.ts

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {}, // placeholder; add future reducers here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
