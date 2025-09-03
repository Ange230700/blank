// src\mocks\handlers.ts

import { http, HttpResponse } from 'msw';
import { db } from 'blank/mocks/db';

const API = 'https://dummyjson.com';

export const handlers = [
  // --- AUTH ---
  http.post(`${API}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      password: string;
    };
    // accept any non-empty credentials; you can tighten if needed
    if (!body.username || !body.password) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      id: db.defaultUser.id,
      username: db.defaultUser.username,
      email: db.defaultUser.email,
      firstName: db.defaultUser.firstName,
      lastName: db.defaultUser.lastName,
      gender: db.defaultUser.gender,
      image: db.defaultUser.image,
      accessToken: db.tokens.access,
      refreshToken: db.tokens.refresh,
    });
  }),

  http.get(`${API}/auth/me`, () => {
    return HttpResponse.json({
      id: db.defaultUser.id,
      username: db.defaultUser.username,
      email: db.defaultUser.email,
      firstName: db.defaultUser.firstName,
      lastName: db.defaultUser.lastName,
      gender: db.defaultUser.gender,
      image: db.defaultUser.image,
    });
  }),

  http.post(`${API}/auth/refresh`, async ({ request }) => {
    const { refreshToken } = (await request.json()) as {
      refreshToken?: string;
    };
    if (refreshToken !== db.tokens.refresh) {
      return HttpResponse.json({ message: 'Invalid refresh' }, { status: 401 });
    }
    return HttpResponse.json({
      accessToken: db.tokens.access, // keep simple
      refreshToken: db.tokens.refresh,
    });
  }),

  // --- USERS ---
  http.get(`${API}/users`, ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 30);
    const skip = Number(url.searchParams.get('skip') ?? 0);
    const users = db.listPublicUsers(limit, skip);
    return HttpResponse.json({ limit, skip, total: 1000, users });
  }),

  http.get(`${API}/users/:id`, ({ params }) => {
    const u = db.users.find((x) => String(x.id) === String(params.id));
    if (!u) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(u);
  }),

  // --- TODOS ---
  http.get(`${API}/todos`, ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 30);
    const skip = Number(url.searchParams.get('skip') ?? 0);
    // provide a mix for default user
    return HttpResponse.json(db.todosByUser(db.defaultUser.id, limit, skip));
  }),

  http.get(`${API}/todos/user/:userId`, ({ params, request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 30);
    const skip = Number(url.searchParams.get('skip') ?? 0);
    return HttpResponse.json(
      db.todosByUser(Number(params.userId), limit, skip),
    );
  }),

  http.put(`${API}/todos/:id`, async ({ request }) => {
    // Just echo completion status (like DummyJSON)
    const body = (await request.json()) as { completed?: boolean };
    return HttpResponse.json({ completed: !!body.completed });
  }),
];
