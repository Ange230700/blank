<!-- README.md -->

# 📱 Blank — TODO list manager mobile app

A **modern Expo + React Native app** is TODO list manager that demonstrates clean architecture, type-safe APIs, state management (Redux Toolkit), secure authentication flows, navigation, Tailwind styling, and a robust developer experience with testing and CI/CD.

---

## 🚀 Features

- **Expo 53 + React Native 0.79** with **React 19** support
- **Navigation** via React Navigation (stack + bottom tabs)
- **Authentication** with JWT-style access/refresh tokens stored in **SecureStore**
- **Redux Toolkit** for global state + async thunks
- **Type-safe schemas** via **Zod**
- **Axios + interceptors** with auto token refresh
- **TailwindCSS (NativeWind)** styling
- **Testing** with Jest, React Testing Library, MSW, and factory-based mocks
- **Code quality** enforced via ESLint (flat config), Prettier, Husky, Commitlint, and lint-staged
- **CI/CD** with GitHub Actions (type-check + tests + coverage)
- **Mock Service Worker (MSW)** for both Node (tests) and Browser (Expo web preview)
- **Ready-to-deploy** to Vercel (`vercel-build` for static web export)

---

## 📂 Project Structure

```
blank/
├── App.tsx              # Root navigation & state provider
├── index.ts             # Entry, mock bootstrap support
├── src/
│   ├── screens/         # Home, Login, Favorites
│   ├── services/        # Auth, Users, Todos, HTTP client
│   ├── stores/          # Redux slices + stores
│   ├── types/           # Zod schemas + TS types
│   ├── components/      # Shared UI components
│   └── mocks/           # MSW handlers, db, bootstrap
├── tests/               # Jest tests, utils, factories
│   ├── mocks/           # Test-specific mocks
│   ├── stores.*.test.ts # Unit tests for Redux
│   ├── screens.*.test.tsx
│   └── utils/           # renderWithStore, helpers
├── .github/workflows/ci.yml  # CI pipeline
├── app.json             # Expo app config
├── tsconfig.json        # TypeScript config
├── jest.config.js       # Jest config
├── eslint.config.js     # ESLint flat config
└── tailwind.config.js   # TailwindCSS setup
```

---

## 🛠️ Tech Stack

**Core:**

- Expo 53, React Native 0.79, React 19
- TypeScript 5.8
- NativeWind (TailwindCSS for RN)

**Navigation:**

- @react-navigation/native, bottom-tabs, native-stack

**State Management:**

- Redux Toolkit (auth, favs slices)

**APIs & Validation:**

- Axios with interceptors
- Zod schemas

**UI:**

- React Native Paper
- Expo Vector Icons (Ionicons)

**Testing:**

- Jest + jest-expo
- React Testing Library (RNTL)
- MSW (node + browser)
- Faker factories for data

**Tooling:**

- ESLint (flat, with TS, RN, Prettier)
- Prettier
- Husky (pre-commit, pre-push, commit-msg)
- Commitlint + Commitizen
- GitHub Actions CI/CD

---

## ⚡ Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 9
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
git clone https://github.com/Ange230700/blank.git
cd blank
npm install
```

### Development

Run in Expo:

```bash
npm start       # launch Expo CLI
npm run android # open Android emulator
npm run ios     # open iOS simulator
npm run web     # run web preview
```

Start with fake API mocks (MSW):

```bash
EXPO_PUBLIC_USE_FAKE=1 npm start
```

---

## 🧪 Testing

Run the Jest test suite:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Continuous Integration (CI):

```bash
npm run test:ci
```

Testing libraries:

- `@testing-library/react-native` for UI
- `jest-expo` for RN environment
- `msw` for mocking API calls
- `faker` factories for mock data

---

## 🌐 Deployment

For Vercel static web export:

```bash
npm run vercel-build
```

This generates a production-ready web build in `/dist` that can be deployed on Vercel or any static host.

---

## 🔑 Environment Variables

Create a `.env` or `.env.local` file:

```env
EXPO_PUBLIC_USE_FAKE=0   # 1 = enable MSW mock API
NODE_ENV=development
```

---

## 🤝 Contributing

Contributions are welcome!
Follow conventional commits (`commitizen`) and branch naming rules (`feature/*`, `fix/*`, `release/*`, etc.).

```bash
git checkout -b feature/awesome-feature
git commit
git push origin feature/awesome-feature
```

---

## 📜 License

MIT License.
