// src\types\user.ts

import { z } from 'zod';

const Coordinates = z.object({ lat: z.number(), lng: z.number() });

const Address = z.object({
  address: z.string(),
  city: z.string(),
  coordinates: Coordinates,
  country: z.string(),
  postalCode: z.string(),
  state: z.string(),
  stateCode: z.string(),
});

export const User = z
  .object({
    id: z.number(),
    username: z.string(),
    password: z.string(),
    email: z.email(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    image: z.url(),
    role: z.string(),
    phone: z.string(),
    birthDate: z.string(),
    address: Address,
    company: z.object({
      name: z.string(),
      department: z.string(),
      title: z.string(),
      address: Address,
    }),
  })
  .loose();

export type User = z.infer<typeof User>;

export const UsersPage = z.object({
  limit: z.number(),
  skip: z.number(),
  total: z.number(),
  users: z.array(User),
});

export type UsersPage = z.infer<typeof UsersPage>;

// Safer public projection for UI
export type PublicUser = Pick<
  User,
  'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'image' | 'role'
>;

export const toPublicUser = (u: User): PublicUser => ({
  id: u.id,
  username: u.username,
  email: u.email,
  firstName: u.firstName,
  lastName: u.lastName,
  image: u.image,
  role: u.role,
});
