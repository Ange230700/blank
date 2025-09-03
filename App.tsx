// App.tsx

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';

import HomeScreen from './src/screens/HomeScreen';
import { store } from './src/stores';

global.Buffer = Buffer;

export type TabParamList = { Home: undefined; Favorites: undefined };
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<{ Root: undefined }>();

const commonTabOptions: BottomTabNavigationOptions = { headerShown: true };

function Tabs() {
  return (
    <Tab.Navigator screenOptions={commonTabOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
