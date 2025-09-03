// src\services\auth.ts

import http from 'blank/services/http';
import * as SecureStore from 'expo-secure-store';
import { LoginResponse, MeResponse } from 'blank/types/auth';

export async function login(username: string, password: string) {
  const { data } = await http.post('/auth/login', {
    username,
    password,
    expiresInMins: 30,
  });
  const parsed = LoginResponse.parse(data);
  await SecureStore.setItemAsync('accessToken', parsed.accessToken);
  await SecureStore.setItemAsync('refreshToken', parsed.refreshToken);
  return parsed;
}

export async function me() {
  const { data } = await http.get('/auth/me');
  return MeResponse.parse(data);
}

export async function logout() {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
}
