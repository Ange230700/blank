// src/features/todos/components/TodoCard.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Todo } from 'blank/types/todo';

type Props = {
  item: Todo;
  onToggle?: (t: Todo) => void;
  onArchive?: (t: Todo) => void;
  onUnarchive?: (t: Todo) => void;
  isArchived?: boolean;
};

export const CARD_HEIGHT = 96;

export function TodoCard({
  item,
  onToggle,
  onArchive,
  onUnarchive,
  isArchived,
}: Readonly<Props>) {
  const checked = item.completed;

  const showArchive = !!onArchive && !isArchived;
  const showUnarchive = !!onUnarchive && !!isArchived;
  const showCheckbox = !!onToggle;

  return (
    <View
      className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 p-3"
      style={{ height: CARD_HEIGHT }}
      accessible
      accessibilityLabel={`Todo: ${item.todo}`}
    >
      <View className="flex-1">
        <Text
          numberOfLines={2}
          className={
            checked
              ? 'line-through opacity-60 text-neutral-500'
              : 'text-neutral-900'
          }
        >
          {item.todo}
        </Text>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        {showArchive && (
          <Pressable
            testID={`archive-${item.id}`}
            onPress={() => onArchive?.(item)}
            accessibilityRole="button"
            accessibilityLabel="Archive this todo"
            hitSlop={6}
            className="flex-row items-center gap-1"
          >
            <Ionicons name="archive-outline" size={18} />
            <Text className="text-neutral-700">Archive</Text>
          </Pressable>
        )}

        {showUnarchive && (
          <Pressable
            testID={`unarchive-${item.id}`}
            onPress={() => onUnarchive?.(item)}
            accessibilityRole="button"
            accessibilityLabel="Unarchive this todo"
            hitSlop={6}
            className="flex-row items-center gap-1"
          >
            <Ionicons name="arrow-undo-outline" size={18} />
            <Text className="text-neutral-700">Unarchive</Text>
          </Pressable>
        )}

        {showCheckbox && (
          <Pressable
            testID={`todo-checkbox-${item.id}`}
            onPress={() => onToggle?.(item)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            accessibilityLabel={`Mark as ${checked ? 'pending' : 'completed'}`}
            hitSlop={8}
            className="flex-row items-center gap-2"
          >
            <Ionicons
              name={checked ? 'checkbox' : 'square-outline'}
              size={22}
              color={checked ? '#2563eb' : '#404040'}
            />
            <Text className="text-neutral-700">
              {checked ? 'Done' : 'Todo'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
