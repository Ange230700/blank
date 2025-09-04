// src/features/todos/components/TodosHeader.tsx
import React from 'react';
import { View } from 'react-native';
import { FilterTabs } from 'blank/features/todos/components/FilterTabs';

type Props = {
  filter: 'all' | 'completed' | 'pending';
  onChangeFilter: (f: 'all' | 'completed' | 'pending') => void;
};

export function TodosHeader({ filter, onChangeFilter }: Readonly<Props>) {
  return (
    <View className="mb-2">
      <FilterTabs value={filter} onChange={onChangeFilter} />
    </View>
  );
}
