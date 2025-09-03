// src\stores\slices\authSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login as apiLogin,
  me as apiMe,
  logout as apiLogout,
} from 'blank/services/auth';
import type { MeResponse } from 'blank/types/auth';

type AuthState = {
  user: MeResponse | null;
  loading: boolean;
  error?: string;
};

const initialState: AuthState = { user: null, loading: false };

export const hydrate = createAsyncThunk('auth/hydrate', async () => {
  return await apiMe(); // throws on 401; caught in rejected
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    await apiLogin(username, password); // stores tokens via SecureStore
    return await apiMe(); // fetch safe profile
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await apiLogout(); // clears tokens
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // hydrate
      .addCase(hydrate.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(hydrate.fulfilled, (s, a) => {
        s.user = a.payload;
        s.loading = false;
      })
      .addCase(hydrate.rejected, (s) => {
        s.user = null;
        s.loading = false;
      })

      // login
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.user = a.payload;
        s.loading = false;
      })
      .addCase(login.rejected, (s) => {
        s.error = 'Invalid credentials';
        s.loading = false;
      })

      // logout
      .addCase(logout.fulfilled, (s) => {
        s.user = null;
      });
  },
});

export default authSlice.reducer;
