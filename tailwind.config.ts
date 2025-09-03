// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← important for web parity
  content: ['./App.{ts,tsx}', './index.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
