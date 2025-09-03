// src\types\auth.ts

import { z } from 'zod';

export const LoginResponse = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.url(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;

export const MeResponse = LoginResponse.omit({
  accessToken: true,
  refreshToken: true,
});

export type MeResponse = z.infer<typeof MeResponse>;
