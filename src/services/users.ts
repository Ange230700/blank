// src\services\users.ts

import http from './http';
import {
  UsersPage,
  User,
  toPublicUser,
  type PublicUser,
} from 'blank/types/user';

export async function listUsers(limit = 30, skip = 0): Promise<PublicUser[]> {
  const { data } = await http.get('/users', { params: { limit, skip } });
  const parsed = UsersPage.parse(data);
  return parsed.users.map(toPublicUser);
}

export async function getUser(id: number): Promise<PublicUser> {
  const { data } = await http.get(`/users/${id}`);
  const parsed = User.parse(data);
  return toPublicUser(parsed);
}
