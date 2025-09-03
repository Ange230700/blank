// src\mocks\bootstrap.ts

import { worker } from 'blank/mocks/browser';
import { faker } from '@faker-js/faker';

export async function startMocking() {
  faker.seed(42);
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' },
    onUnhandledRequest: 'bypass',
  });
}
