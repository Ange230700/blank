// index.ts

import 'react-native-reanimated';
import { registerRootComponent } from 'expo';

if (process.env.EXPO_PUBLIC_USE_FAKE === '1') {
  import('./src/mocks/bootstrap').then((m) => m.startMocking());
}

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
