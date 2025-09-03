// src/features/todos/components/FilterTabs.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { TodoFilter } from 'blank/features/todos/ui/constants';

type Props = {
  value: TodoFilter;
  onChange: (f: TodoFilter) => void;
};

const FILTERS: readonly TodoFilter[] = ['all', 'completed', 'pending'] as const;

export function FilterTabs({ value, onChange }: Readonly<Props>) {
  return (
    <View
      className="flex-row gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1 h-12"
      accessibilityRole="tablist"
      testID="filters"
    >
      {FILTERS.map((k) => {
        const selected = value === k;
        return (
          <Pressable
            key={k}
            testID={`filter-${k}`}
            onPress={() => onChange(k)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={`Show ${k} todos`}
            accessibilityHint="Filters the list below"
            hitSlop={6}
            className={`flex-1 items-center justify-center rounded-lg ${selected ? 'bg-white dark:bg-neutral-700' : ''}`}
          >
            <Text
              className={`capitalize ${selected ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-neutral-700 dark:text-neutral-300'}`}
            >
              {k}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
