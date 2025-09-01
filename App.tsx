// App.tsx

import 'react-native-gesture-handler'; // safe to include for navigation gestures
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
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
    <Tab.Navigator
      screenOptions={({ route }) =>
        getTabOptions(route.name)
      }
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

/** Stack that hosts the tabs */
export type RootStackParamList = {
  Root: NavigatorScreenParams<TabParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false } as NativeStackNavigationOptions}
      >
        <Stack.Screen name="Root" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
