<!-- README.md -->

# 📱 Blank — TODO list manager (Expo + React Native)

A **modern Expo + React Native app** that demonstrates clean architecture, type-safe APIs, Redux Toolkit state, accessible UI, Tailwind styling, and a robust DX (tests, linting, CI).

---

## 🚀 Features

- **Expo 53 · React Native 0.79 · React 19**
- **Navigation**: React Navigation
  - Root **stack** + bottom tabs (**Home** + **Archive**)
  - Tab **icons** with filled/outline states based on focus

- **Redux Toolkit** store (archive slice)
- **Type-safe schemas** with **Zod**
- **Tailwind (NativeWind)** (web)
- **Testing**: Jest + React Testing Library (stable `testID`s), service mocks
- **Accessibility**: roles, labels, hints, keyboard/screen reader friendly
- **Performance**: optimized FlatList (fixed row heights, `getItemLayout`, sticky header, tuned batch/window props)
- **Programmatic scroll**: jump to index with robust fallback
- **Code quality**: ESLint, Prettier, Husky, Commitlint, lint-staged
- **CI/CD**: GitHub Actions (type-check + tests + coverage)
- **Ready to deploy** to Vercel (static web export)

> The **Archive** tab lists items you archived from Home; you can **unarchive** individual items or **clear all**.

---

## 📂 Project Structure

```
blank/
├── App.tsx                        # Navigation, theme parity, status bar
├── index.ts                       # Entry
├── src/
│   ├── components/
│   │   └── TabBarIcon.tsx
│   ├── features/
│   │   ├── todos/
│   │   │   ├── components/
│   │   │   │   ├── FilterTabs.tsx
│   │   │   │   ├── TodoRow.tsx
│   │   │   │   └── TodosHeader.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useTodos.ts            # fetching, filtering, optimistic toggle
│   │   │   └── ui/
│   │   │       ├── constants.ts           # ROW_HEIGHT, HEADER_HEIGHT, types
│   │   │       └── styles.ts              # list content padding
│   │   └── archive/
│   │       ├── components/
│   │       │   └── ArchiveRow.tsx
│   │       └── hooks/
│   │           └── useArchive.ts          # select/dispatch archive slice
│   ├── screens/
│   │   ├── HomeScreen.tsx                 # list + filters + jump + archive action
│   │   └── ArchiveScreen.tsx              # archived list (unarchive / clear)
│   ├── services/
│   │   ├── http.ts                        # Axios instance (https://dummyjson.com)
│   │   └── todos.ts                       # listTodos, toggleTodo (Zod-validated)
│   ├── stores/
│   │   ├── archiveSlice.ts                # Redux archive state
│   │   ├── index.ts                       # store with archive reducer
│   │   └── hooks.ts                       # typed hooks
│   └── types/
│       └── todo.ts                        # Zod schemas + types
├── tests/
│   ├── screens.HomeScreen.test.tsx        # testID-based, service mocks
│   └── utils/renderWithStore.tsx
├── app.json
├── tailwind.config.js
├── jest.config.js
├── jest.setup.js
├── tsconfig.json
├── eslint.config.js
└── README.md
```

---

## 🛠️ Tech Stack

**Core**: Expo 53 · RN 0.79 · React 19 · TypeScript 5.8
**Navigation**: `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`
**State**: Redux Toolkit (+ archive slice)
**API/Validation**: Axios, Zod
**UI**: NativeWind (Tailwind), Expo Vector Icons (Ionicons)
**Testing**: Jest + jest-expo, React Testing Library (RNTL), faker factories
**Tooling**: ESLint, Prettier, Husky, Commitlint, Commitizen, lint-staged
**CI/CD**: GitHub Actions

---

## ⚡ Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 9
- Expo CLI (`npm i -g expo-cli`)

### Install

```bash
git clone https://github.com/Ange230700/blank.git
cd blank
npm install
```

### Run

```bash
npm start       # Expo CLI
npm run android # Android emulator
npm run ios     # iOS simulator
npm run web     # Web preview
```

---

## 🧪 Testing

Run all:

```bash
npm test
```

Watch:

```bash
npm run test:watch
```

CI mode:

```bash
npm run test:ci
```

- UI tests use **stable `testID`s** (`filter-*`, `todo-switch-*`, `jump-to-21`).
- Services are mocked (`blank/services/todos`).
- Jest alias maps both `blank` and `blank1` to `<rootDir>/src`:

  **`jest.config.js`**

  ```js
  export default {
    preset: 'jest-expo',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^blank/(.*)$': '<rootDir>/src/$1',
      '^blank1/(.*)$': '<rootDir>/src/$1',
    },
  };
  ```

---

## ♿ Accessibility

- **Filters** use `tablist`/`tab` roles, `selected` state, and hints:
  “**Filters the list below**”.
- Switches have `accessibilityRole="switch"` + explicit labels.
- Sticky filter header stays visible while scrolling.

---

## ⚙️ Performance

- **Fixed heights**: header `h-12` (48px), row `h-14` (56px)
  → exact `getItemLayout` for fast jumps & rendering.
- **FlatList tuning**:
  - `initialNumToRender={10}`
  - `windowSize={5}`
  - `maxToRenderPerBatch={10}`
  - `removeClippedSubviews`
  - `stickyHeaderIndices={[0]}`

- **Programmatic jump**: `scrollToIndex` + robust `onScrollToIndexFailed` fallback.

---

## 🗂 Archive flow

- **Home → Archive**: Tap the archive icon on a row to store it in the archive slice.
- **Archive tab**: Lists archived todos; **Unarchive** item or **Clear all**.
- Implementation:
  - `src/stores/archiveSlice.ts`
  - `useArchive()` for selection & dispatch
  - `ArchiveRow` for row UI

---

## 🌐 Deployment (Web / Vercel)

Build static export:

```bash
npm run export
```

This outputs a production-ready web build in `/dist` suitable for Vercel or any static host.

---

## 🤝 Contributing

Conventional commits & simple branching:

```bash
git checkout -b feature/awesome-feature
git commit
git push origin feature/awesome-feature
```

---

## 🗺️ Roadmap

- Detail screen for a selected todo (with “archive/unarchive” & “toggle”).
- Swipe actions (`react-native-gesture-handler`) for archive/unarchive.
- Persist Redux state (e.g., `redux-persist`) to keep archive across sessions.

---

## 📜 License

MIT License.
