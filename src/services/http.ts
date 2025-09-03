// src\services\http.ts

import axios, {
  type AxiosRequestConfig,
  type AxiosError,
  AxiosHeaders,
  type AxiosRequestHeaders,
} from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_URL = 'https://dummyjson.com';

// Local helper type instead of augmenting Axios types
type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };

// Helper: always get an AxiosHeaders instance
function ensureAxiosHeaders(h?: AxiosRequestHeaders | AxiosHeaders) {
  return h instanceof AxiosHeaders ? h : new AxiosHeaders(h);
}

const http = axios.create({ baseURL: API_URL });

http.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    const headers = ensureAxiosHeaders(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});

let refreshing: Promise<string | null> | null = null;

http.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      refreshing ??= (async () => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) return null;

        try {
          const { data } = await axios.post<{
            accessToken?: string;
            refreshToken?: string;
          }>(`${API_URL}/auth/refresh`, { refreshToken, expiresInMins: 30 });

          if (data?.accessToken) {
            await SecureStore.setItemAsync('accessToken', data.accessToken);
          }
          if (data?.refreshToken) {
            await SecureStore.setItemAsync('refreshToken', data.refreshToken);
          }
          return data?.accessToken ?? null;
        } catch {
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('refreshToken');
          return null;
        } finally {
          // important: reset after consumers awaited it
          refreshing = null;
        }
      })();

      const newToken = await refreshing;
      if (newToken) {
        original.headers = {
          ...(original.headers ?? {}),
          Authorization: `Bearer ${newToken}`,
        };
        return http(original); // retry original request
      }
    }

    throw error;
  },
);

export default http;
