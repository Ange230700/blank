// src\mocks\db.ts

import { faker } from '@faker-js/faker';
import { makeUser, toPublic } from 'blank1/mocks/factories/user';
import { makeTodosPageByUser } from 'blank1/mocks/factories/todo';
import type { PublicUser } from 'blank/types/user';

faker.seed(42);

const users = Array.from({ length: 50 }, (_, i) => makeUser(i + 1));
const defaultUser = users[0]; // “logged-in” user if credentials are ok

export const db = {
  users,
  defaultUser,
  tokens: { access: 'fake-access', refresh: 'fake-refresh' },
  listPublicUsers(limit = 30, skip = 0): PublicUser[] {
    return users.slice(skip, skip + limit).map(toPublic);
  },
  todosByUser(userId: number, limit = 30, skip = 0) {
    return makeTodosPageByUser(userId, limit, skip);
  },
};
