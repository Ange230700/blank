// src/screens/ArchiveScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function ArchiveScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
      <Text className="text-lg text-neutral-900 dark:text-neutral-100">
        Archived todos will appear here
      </Text>
    </View>
  );
}
