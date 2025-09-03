// tests\mocks\authStore.mock.ts

const mockHydrate = jest.fn();
let state: any = {
  user: null,
  loading: false,
  error: undefined,
  hydrate: mockHydrate,
};
export const __setMockAuthState = (next: Partial<typeof state>) => {
  state = { ...state, ...next };
};
export const useAuth = () => state;
