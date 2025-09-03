// App.tsx

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Buffer } from 'buffer';
import type { NavigatorScreenParams } from '@react-navigation/native';

import HomeScreen from 'blank/screens/HomeScreen';
import FavoritesScreen from 'blank/screens/FavoritesScreen';
import TabBarIcon from 'blank/components/TabBarIcon';
import LoginScreen from 'blank/screens/LoginScreen';

import { store } from 'blank/stores';
import { useAppDispatch, useAppSelector } from 'blank/stores/hooks';
import { hydrate } from 'blank/stores/slices/authSlice';

global.Buffer = Buffer;

export type TabParamList = { Home: undefined; Favorites: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// ---- HOISTED CONSTANTS / RENDERERS (stable across renders)
const iconMap = { Home: 'home', Favorites: 'heart' } as const;

const commonTabOptions: BottomTabNavigationOptions = {
  headerShown: true,
};

const TabBarIconHome: NonNullable<BottomTabNavigationOptions['tabBarIcon']> = ({
  color,
  size,
}) => <TabBarIcon name={iconMap.Home} color={color} size={size} />;

const TabBarIconFavorites: NonNullable<
  BottomTabNavigationOptions['tabBarIcon']
> = ({ color, size }) => (
  <TabBarIcon name={iconMap.Favorites} color={color} size={size} />
);
// ---- end hoisted

function Tabs() {
  return (
    <Tab.Navigator screenOptions={commonTabOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: TabBarIconHome }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarIcon: TabBarIconFavorites }}
      />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<TabParamList>;
  Login: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootApp() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  let content: React.ReactNode = null;
  if (!loading && user) {
    content = (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={Tabs} />
      </Stack.Navigator>
    );
  } else if (!loading && !user) {
    content = (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Sign in' }}
        />
      </Stack.Navigator>
    );
  }

  return <NavigationContainer>{content}</NavigationContainer>;
}

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}
