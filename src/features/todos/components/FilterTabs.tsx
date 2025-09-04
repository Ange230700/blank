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
const CONTAINER_H = 48;
const TAB_H = 40;

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
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 4,
  },
  row: {
    gap: 8,
  },
  col: {
    flex: 1,
    paddingHorizontal: 4,
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
    color: '#404040',
  },
  tabTextSelected: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
