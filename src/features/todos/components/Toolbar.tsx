// src/features/todos/components/Toolbar.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onRefresh: () => void;
};

export function Toolbar({ onRefresh }: Readonly<Props>) {
  return (
    <View className="mb-3 flex-row items-center justify-end gap-2">
      <Pressable
        testID="action-refresh"
        onPress={onRefresh}
        accessibilityRole="button"
        accessibilityLabel="Refresh list"
        className="flex-row items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2"
        hitSlop={6}
      >
        <Ionicons name="refresh-outline" size={18} />
        <Text className="text-neutral-700">Refresh</Text>
      </Pressable>
    </View>
  );
}
