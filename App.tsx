// App.tsx
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Buffer } from 'buffer';

import HomeScreen from './src/screens/HomeScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import TabBarIcon from './src/components/TabBarIcon';
import { store } from './src/stores';
import { SafeAreaProvider } from 'react-native-safe-area-context';

global.Buffer = Buffer;

export type TabParamList = { Home: undefined; Archive: undefined };
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<{ Root: undefined }>();

type IconProps = { focused: boolean; color: string; size: number };
function HomeIcon({ focused, color, size }: IconProps) {
  return (
    <TabBarIcon
      name={focused ? 'home' : 'home-outline'}
      color={color}
      size={size}
    />
  );
}
function ArchiveIcon({ focused, color, size }: IconProps) {
  return (
    <TabBarIcon
      name={focused ? 'archive' : 'archive-outline'}
      color={color}
      size={size}
    />
  );
}

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true, tabBarShowLabel: true }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{ tabBarIcon: ArchiveIcon }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const navTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // Web: keep NativeWind in sync by toggling .dark on <html>
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', scheme === 'dark');
    }
  }, [scheme]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={Tabs} />
          </Stack.Navigator>

          {/* Status bar contrasts with theme on native; no-op on web */}
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
