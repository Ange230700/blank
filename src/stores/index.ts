// src\stores\index.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import favsReducer from './slices/favsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favs: favsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
