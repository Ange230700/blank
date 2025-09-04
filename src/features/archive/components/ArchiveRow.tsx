// src/features/archive/components/ArchiveRow.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Todo } from 'blank/types/todo';

export function ArchiveRow({
  item,
  onUnarchive,
}: Readonly<{ item: Todo; onUnarchive: (id: number) => void }>) {
  return (
    <View
      className="h-14 flex-row items-center justify-between border-b border-neutral-200"
      accessible
      accessibilityLabel={`Archived todo: ${item.todo}`}
    >
      <Text numberOfLines={1} className="pr-3 text-neutral-700">
        {item.todo}
      </Text>
      <Pressable
        testID={`unarchive-${item.id}`}
        onPress={() => onUnarchive(item.id)}
        accessibilityRole="button"
        accessibilityLabel="Unarchive this todo"
        hitSlop={6}
        className="px-2 py-1 rounded-lg bg-neutral-100"
      >
        <Ionicons name="archive" size={18} />
      </Pressable>
    </View>
  );
}
