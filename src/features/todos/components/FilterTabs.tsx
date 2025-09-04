// src/features/todos/components/FilterTabs.tsx
import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { TodoFilter } from 'blank/features/todos/ui/constants';

type Props = {
  value: TodoFilter;
  onChange: (f: TodoFilter) => void;
};

const FILTERS: readonly TodoFilter[] = ['all', 'completed', 'pending'] as const;
const CONTAINER_H = 48; // matches sticky header height
const TAB_H = 40; // container (48) - vertical padding (4+4)

export function FilterTabs({ value, onChange }: Readonly<Props>) {
  const data = useMemo(() => FILTERS.slice(), []);

  const renderItem: ListRenderItem<TodoFilter> = ({ item }) => {
    const selected = value === item;
    return (
      <View style={styles.col}>
        <Pressable
          testID={`filter-${item}`}
          onPress={() => onChange(item)}
          accessibilityRole="tab"
          accessibilityState={{ selected }}
          accessibilityLabel={`Show ${item} todos`}
          accessibilityHint="Filters the list below"
          hitSlop={6}
          style={[styles.tab, selected && styles.tabSelected]}
        >
          <Text style={[styles.tabText, selected && styles.tabTextSelected]}>
            {item}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container} accessibilityRole="tablist" testID="filters">
      <FlatList
        data={data}
        keyExtractor={(k) => k}
        numColumns={3}
        scrollEnabled={false}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_H,
    borderRadius: 12,
    backgroundColor: '#f5f5f5', // neutral-100
  },
  content: {
    padding: 4, // p-1
  },
  row: {
    // RN may not have typed 'gap' yet; fallback is handled by col padding.
    // @ts-ignore
    gap: 8,
  },
  col: {
    flex: 1,
    paddingHorizontal: 4, // pairs with row gap fallback
  },
  tab: {
    height: TAB_H,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelected: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    textTransform: 'capitalize',
    color: '#404040', // neutral-700
  },
  tabTextSelected: {
    color: '#2563eb', // blue-600
    fontWeight: '700',
  },
});
