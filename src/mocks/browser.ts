// src\mocks\browser.ts

import { setupWorker } from 'msw/browser';
import { handlers } from 'blank/mocks/handlers';
export const worker = setupWorker(...handlers);
