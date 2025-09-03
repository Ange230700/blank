// tests\mocks\factories\user.ts

import { faker } from '@faker-js/faker';
import type { PublicUser, User, UsersPage } from 'blank/types/user';

export function makeUser(id = faker.number.int({ min: 1, max: 9999 })): User {
  const gender = faker.person.sexType();
  return {
    id,
    username: faker.internet.username(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(gender),
    lastName: faker.person.lastName(),
    gender,
    image: faker.image.avatarGitHub(), // valid URL
    role: faker.helpers.arrayElement(['user', 'admin']),
    phone: faker.phone.number(),
    birthDate: faker.date
      .birthdate({ min: 18, max: 55, mode: 'age' })
      .toISOString()
      .split('T')[0],
    address: {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      coordinates: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      state: faker.location.state(),
      stateCode: faker.location.countryCode(),
    },
    company: {
      name: faker.company.name(),
      department: faker.commerce.department(),
      title: faker.person.jobTitle(),
      address: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        coordinates: {
          lat: faker.location.latitude(),
          lng: faker.location.longitude(),
        },
        country: faker.location.country(),
        postalCode: faker.location.zipCode(),
        state: faker.location.state(),
        stateCode: faker.location.countryCode(),
      },
    },
  };
}

export function toPublic(u: User): PublicUser {
  return {
    id: u.id,
    username: u.username,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    image: u.image,
    role: u.role,
  };
}

export function makeUsersPage(count = 30, skip = 0): UsersPage {
  const users = Array.from({ length: count }, (_, i) => makeUser(skip + i + 1));
  return { limit: count, skip, total: 1000, users };
}
