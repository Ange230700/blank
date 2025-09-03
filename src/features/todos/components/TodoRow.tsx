// src/features/todos/components/TodoRow.tsx
import React from 'react';
import { Switch, Text, View } from 'react-native';
import type { Todo } from 'blank/types/todo';

type Props = {
  item: Todo;
  onToggle: (t: Todo) => void;
};

export function TodoRow({ item, onToggle }: Readonly<Props>) {
  return (
    <View
      className="h-14 flex-row items-center justify-between border-b border-neutral-200 dark:border-neutral-700"
      accessible
      accessibilityLabel={`Todo: ${item.todo}`}
    >
      <Text
        numberOfLines={1}
        className={`${item.completed ? 'line-through opacity-60 text-neutral-500' : 'text-neutral-900 dark:text-neutral-100'} pr-3`}
      >
        {item.todo}
      </Text>
      <Switch
        testID={`todo-switch-${item.id}`}
        value={item.completed}
        onValueChange={() => onToggle(item)}
        accessibilityRole="switch"
        accessibilityLabel={`Mark as ${item.completed ? 'pending' : 'completed'}`}
        hitSlop={6}
      />
    </View>
  );
}
