// tests\msw\server.ts

import { setupServer } from 'msw/node';
import { handlers } from 'blank/mocks/handlers';
export const server = setupServer(...handlers);
