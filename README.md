<!-- README.md -->

# 📱 Blank — TODO list manager (Expo + React Native)

A **modern Expo + React Native app** that demonstrates clean architecture, type-safe APIs, Redux Toolkit state, accessible UI, Tailwind-like styling, and a robust DX (tests, linting, CI).

---

## 🚀 Features

- **Expo 53 · React Native 0.79 · React 19**
- **Navigation**: React Navigation
  - Root **stack** + bottom tabs (**Home** + **Archive**)
  - Tab **icons** (filled / outline on focus)
- **Redux Toolkit** store (**archive slice**)
- **Type-safe schemas** with **Zod**
- **Tailwind (NativeWind classes)** for styling (light mode only)
- **Accessible UI**: roles, labels, hints, sticky filter header
- **Responsive layout**:
  - **List** (1 column): compact rows with switches
  - **Grid** (2–4 columns): **Todo cards** with checkboxes
- **Archive flow**:
  - Archive from **Home**
  - **Archive** tab lists archived items (unarchive / clear all)
- **Performance**:
  - Fixed heights with `getItemLayout`
  - Tuned `FlatList` batch/window props
  - Sticky header + programmatic scroll fallback
- **Testing**: Jest + React Testing Library, stable `testID`s, service mocks
- **Code quality**: ESLint, Prettier, Husky, Commitlint, lint-staged
- **CI/CD**: GitHub Actions (type-check + tests + coverage)
- **Ready to deploy** to Vercel (static web export)

> The **Archive** tab lists items you archived from Home; you can **unarchive** individual items or **clear all**.

---

## 📂 Project Structure

```

blank/
├── App.tsx                        # Navigation (tabs), StatusBar
├── index.ts                       # Entry
├── src/
│   ├── components/
│   │   └── TabBarIcon.tsx
│   ├── features/
│   │   ├── todos/
│   │   │   ├── components/
│   │   │   │   ├── FilterTabs.tsx
│   │   │   │   ├── TodoCard.tsx
│   │   │   │   ├── TodoRow\.tsx
│   │   │   │   └── TodosHeader.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useTodos.ts
│   │   │   └── ui/
│   │   │       ├── constants.ts           # ROW\_HEIGHT, HEADER\_HEIGHT, types
│   │   │       └── styles.ts              # list/layout styles
│   │   └── archive/
│   │       ├── components/
│   │       │   └── ArchiveRow\.tsx
│   │       └── hooks/
│   │           └── useArchive.ts          # select/dispatch archive slice
│   ├── screens/
│   │   ├── HomeScreen.tsx                 # list/grid + filters + archive action
│   │   └── ArchiveScreen.tsx              # archived list (unarchive / clear)
│   ├── services/
│   │   ├── http.ts                        # Axios instance ([https://dummyjson.com](https://dummyjson.com))
│   │   └── todos.ts                       # listTodos, toggleTodo (Zod-validated)
│   ├── stores/
│   │   ├── archiveSlice.ts                # Redux archive state
│   │   ├── index.ts                       # store with archive reducer
│   │   └── hooks.ts                       # typed hooks
│   ├── ui/
│   │   ├── layout.ts                      # container max width / centering
│   │   └── responsive.ts                  # useGridColumns (2–4 cols)
│   └── types/
│       └── todo.ts                        # Zod schemas + types
├── tests/
│   ├── screens.HomeScreen.test.tsx        # testID-based, service mocks
│   └── utils/renderWithStore.tsx          # store helper with archive reducer
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
**State**: Redux Toolkit (**archive slice**)  
**API/Validation**: Axios, Zod  
**UI**: NativeWind utility classes, Expo Vector Icons (Ionicons), light mode  
**Testing**: Jest + `jest-expo`, React Testing Library (RNTL), faker factories  
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

### Test setup highlights

- **Store helper includes archive reducer**:

  ```ts
  // tests/utils/renderWithStore.tsx
  import archive from 'blank/stores/archiveSlice';
  export function setupStore() {
    return configureStore({ reducer: { archive } });
  }
  ```

- **Stable `testID`s**: `filter-*`, `todo-switch-*` (list), `todo-checkbox-*` (grid), `archive-*`, `unarchive-*`, `clear-archive`.

- **Responsive layout in tests**
  The Home screen renders a **list with Switches** when `useGridColumns()` returns `1`, and **cards with checkboxes** when it returns `≥ 2`.
  You can **force 1 column** for deterministic tests:

  ```ts
  // tests/screens.HomeScreen.test.tsx
  jest.mock('blank/ui/responsive', () => ({
    useGridColumns: () => 1,
  }));
  ```

  Or handle both UIs in the test by checking for either a switch or a checkbox.

- **Module aliases**:

  ```js
  // jest.config.js
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

- Filters use `tablist` / `tab` roles with `selected` state and hint: “**Filters the list below**”.
- Controls (switches, checkboxes, archive/unarchive, clear) have roles and labels.
- Sticky filter header stays visible while scrolling.

---

## ⚙️ Performance

- **Fixed heights** for precise virtualization:
  - Header `h-12` (48px), Row `h-14` (56px), Card height constant

- **FlatList tuning**:
  - `initialNumToRender`, `windowSize`, `maxToRenderPerBatch`, `removeClippedSubviews`
  - `stickyHeaderIndices={[0]}`
  - `getItemLayout` for list rows; grid uses measured/approx offsets

- **Programmatic scroll** with robust `onScrollToIndexFailed` fallback

---

## 🗂 Archive flow

- **Home → Archive**: Tap **Archive** on a row/card to store it in the archive slice.
- **Archive tab**: List of archived todos; **Unarchive** individual items or **Clear all**.
- Implementation:
  - `src/stores/archiveSlice.ts`
  - `useArchive()` (selection & dispatch)
  - `ArchiveScreen` with styled header + separator-based spacing

---

## 🌐 Deployment (Web / Vercel)

Live demo: [Blank](https://blank-olive.vercel.app/)

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

- Todo detail screen (archive/unarchive & toggle).
- Swipe actions for archive/unarchive.
- Persist Redux state (e.g., `redux-persist`) to keep archive across sessions.

---

## 📜 License

MIT License.

## 🚧 What’s missing vs. the test brief

- **Detail screen & “add to favorites” from details**
  The brief expects a tap on a list item to open a **detail page** with more info, plus a **button to add the item to Favorites**. The current app doesn’t have a detail screen; archive actions happen directly from the list/grid.&#x20;

- **“Favorites” terminology (we use Archive)**
  The brief asks for a bottom tab navigator with **Home** and a **Favorites** page. We implemented **Archive** instead (functionally similar but semantically different).

- **Theme switch**
  At least one bonus feature is required (filters/tests/theme). We’ve covered **filters** and **tests** already; the **light/dark theme switch** bonus is not present (by design we kept light-only). This still satisfies the “choose ≥1 bonus,” but callout here for completeness.&#x20;
