// tailwind.config.js

import type { Config } from 'tailwindcss';

export default {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
