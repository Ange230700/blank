// src/features/todos/components/TodoRow.tsx
import React from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Todo } from 'blank/types/todo';

type Props = {
  item: Todo;
  onToggle: (t: Todo) => void;
  onArchive?: (t: Todo) => void;
  isArchived?: boolean;
};

export function TodoRow({
  item,
  onToggle,
  onArchive,
  isArchived,
}: Readonly<Props>) {
  return (
    <View
      className="h-14 flex-row items-center justify-between border-b border-neutral-200"
      accessible
      accessibilityLabel={`Todo: ${item.todo}`}
    >
      <Text
        numberOfLines={1}
        className={`${item.completed ? 'line-through opacity-60 text-neutral-500' : 'text-neutral-900'} pr-3`}
      >
        {item.todo}
      </Text>

      <View className="flex-row items-center gap-3">
        {!!onArchive && !isArchived && (
          <Pressable
            testID={`archive-${item.id}`}
            onPress={() => onArchive(item)}
            accessibilityRole="button"
            accessibilityLabel="Archive this todo"
            hitSlop={6}
            className="flex-row items-center gap-1"
          >
            <Ionicons name="archive-outline" size={18} />
            <Text className="text-neutral-700">Archive</Text>
          </Pressable>
        )}

        <Switch
          testID={`todo-switch-${item.id}`}
          value={item.completed}
          onValueChange={() => onToggle(item)}
          accessibilityRole="switch"
          accessibilityLabel={`Mark as ${item.completed ? 'pending' : 'completed'}`}
          hitSlop={6}
        />
      </View>
    </View>
  );
}
