// tests\types.user.test.ts

import { User, toPublicUser } from 'blank/types/user';

const sample = {
  id: 1,
  username: 'emilys',
  password: 'emilyspass',
  email: 'emily.johnson@x.dummyjson.com',
  firstName: 'Emily',
  lastName: 'Johnson',
  gender: 'female',
  image: 'https://dummyjson.com/icon/emilys/128',
  role: 'admin',
  phone: '+81 965-431-3024',
  birthDate: '1996-5-30',
  address: {
    address: '626 Main Street',
    city: 'Phoenix',
    coordinates: { lat: -77.16213, lng: -92.084824 },
    country: 'United States',
    postalCode: '29112',
    state: 'Mississippi',
    stateCode: 'MS',
  },
  company: {
    name: 'Dooley, Kozey and Cronin',
    department: 'Engineering',
    title: 'Sales Manager',
    address: {
      address: '263 Tenth Street',
      city: 'San Francisco',
      coordinates: { lat: 71.814525, lng: -161.150263 },
      country: 'United States',
      postalCode: '37657',
      state: 'Wisconsin',
      stateCode: 'WI',
    },
  },
  // extra fields should be tolerated due to .loose()
  ssn: '900-590-289',
};

describe('User schema', () => {
  it('parses a full user and strips nothing (loose mode)', () => {
    const parsed = User.parse(sample);
    expect(parsed.username).toBe('emilys');
    // extra field survives in .loose() (not validated): @ts-expect-error
    expect(parsed.ssn).toBe('900-590-289');
  });

  it('creates a PublicUser safely', () => {
    const parsed = User.parse(sample);
    const pub = toPublicUser(parsed);
    expect(pub).toEqual({
      id: 1,
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      image: 'https://dummyjson.com/icon/emilys/128',
      role: 'admin',
    });
  });
});
