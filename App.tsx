// App.tsx

import 'react-native-gesture-handler'; // safe to include for navigation gestures
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Buffer } from 'buffer';
import type { NavigatorScreenParams } from '@react-navigation/native';

import HomeScreen from 'blank/screens/HomeScreen';
import FavoritesScreen from 'blank/screens/FavoritesScreen';
import TabBarIcon from 'blank/components/TabBarIcon';
import { useAuth } from 'blank/stores/authStore';
import LoginScreen from 'blank/screens/LoginScreen';

global.Buffer = Buffer;

/** Tabs first */
export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const iconMap: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Favorites: 'heart',
} as const;

function getTabOptions(
  routeName: keyof TabParamList,
): BottomTabNavigationOptions {
  return {
    headerShown: true,
    tabBarIcon: ({ color, size }) => (
      <TabBarIcon name={iconMap[routeName]} color={color} size={size} />
    ),
  };
}

function Tabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => getTabOptions(route.name)}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

/** Stack that hosts the tabs */
export type RootStackParamList = {
  Root: NavigatorScreenParams<TabParamList>;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { user, hydrate, loading } = useAuth();

  useEffect(() => {
    hydrate();
  }, []);

  let content: React.ReactNode;
  if (loading) {
    content = null;
  } else if (user) {
    content = (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={Tabs} />
      </Stack.Navigator>
    );
  } else {
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
