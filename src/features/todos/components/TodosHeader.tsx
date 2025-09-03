// src/features/todos/components/TodosHeader.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { FilterTabs } from 'blank/features/todos/components/FilterTabs';

type Props = {
  filter: 'all' | 'completed' | 'pending';
  onChangeFilter: (f: 'all' | 'completed' | 'pending') => void;
  onJumpTo21?: () => void;
};

export function TodosHeader({
  filter,
  onChangeFilter,
  onJumpTo21,
}: Readonly<Props>) {
  return (
    <View className="mb-2">
      <FilterTabs value={filter} onChange={onChangeFilter} />
      <View className="flex-row justify-end mt-2">
        <Pressable
          testID="jump-to-21"
          onPress={onJumpTo21}
          className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
          accessibilityRole="button"
          accessibilityLabel="Jump to item 21"
          accessibilityHint="Scrolls the list to the 21st item"
          hitSlop={6}
        >
          <Text className="text-neutral-700 dark:text-neutral-200">
            Jump to #21
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
