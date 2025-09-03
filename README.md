<!-- README.md -->

# 📱 Blank — TODO list manager mobile app

A **modern Expo + React Native app** is TODO list manager that demonstrates clean architecture, type-safe APIs, state management (Redux Toolkit), navigation, Tailwind styling, and a robust developer experience with testing and CI/CD.

---

## 🚀 Features

- **Expo 53 + React Native 0.79** with **React 19** support
- **Navigation** via React Navigation (stack + bottom tabs)
- **Redux Toolkit** stores
- **Type-safe schemas** via **Zod**
- **TailwindCSS (NativeWind)** styling
- **Testing** with Jest, React Testing Library
- **Code quality** enforced via ESLint, Prettier, Husky, Commitlint, and lint-staged
- **CI/CD** with GitHub Actions (type-check + tests + coverage)
- **Ready-to-deploy** to Vercel (`export` for static web export)

---

## 📂 Project Structure

```
blank/
├── App.tsx                      # Navigation (tabs)
├── index.ts                     # Entry
├── src/
│   ├── screens/
│   │   └── HomeScreen.tsx       # List + toggle todos
│   ├── services/
│   │   ├── http.ts              # Axios instance (https://dummyjson.com)
│   │   └── todos.ts             # listTodos, toggleTodo
│   ├── stores/
│   │   ├── index.ts             # Redux store
│   │   └── hooks.ts             # typed useDispatch/useSelector
│   ├── types/
│   │   └── todo.ts              # Zod schemas + types
│   └── components/
│       └── TabBarIcon.tsx
├── tests/
│   ├── screens.HomeScreen.test.tsx
│   └── utils/renderWithStore.tsx
├── app.json
├── tsconfig.json
├── jest.config.js
├── jest.setup.js
├── eslint.config.js
└── tailwind.config.js
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

- Redux Toolkit

**APIs & Validation:**

- Axios
- Zod schemas

**UI:**

- React Native Paper
- Expo Vector Icons (Ionicons)

**Testing:**

- Jest + jest-expo
- React Testing Library (RNTL)
- Faker factories for data

**Tooling:**

- ESLint
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
- `faker` factories for mock data

---

## 🌐 Deployment

For Vercel static web export:

```bash
npm run export
```

This generates a production-ready web build in `/dist` that can be deployed on Vercel or any static host.

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
