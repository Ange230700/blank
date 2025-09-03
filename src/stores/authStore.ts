// src\stores\authStore.ts

import { create } from 'zustand';
import {
  login as apiLogin,
  me as apiMe,
  logout as apiLogout,
} from 'blank/services/auth';
import type { MeResponse } from 'blank/types/auth';

type State = { user: MeResponse | null; loading: boolean; error?: string };
type Actions = {
  hydrate: () => Promise<void>;
  login: (u: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<State & Actions>((set) => ({
  user: null,
  loading: false,
  async hydrate() {
    set({ loading: true, error: undefined });
    try {
      const me = await apiMe();
      set({ user: me, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
  async login(u, p) {
    set({ loading: true, error: undefined });
    try {
      await apiLogin(u, p);
      const me = await apiMe();
      set({ user: me, loading: false });
    } catch {
      set({ error: 'Invalid credentials', loading: false });
    }
  },
  async logout() {
    await apiLogout();
    set({ user: null });
  },
}));
