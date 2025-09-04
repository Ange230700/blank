// src/features/todos/components/StatsPills.tsx
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Props = {
  total: number;
  completed: number;
  pending: number;
};

export function StatsPills({ total, completed, pending }: Readonly<Props>) {
  const data = useMemo(
    () => [
      { key: 'total', label: 'Total', value: total },
      { key: 'completed', label: 'Completed', value: completed },
      { key: 'pending', label: 'Pending', value: pending },
    ],
    [total, completed, pending],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.key}
      numColumns={3}
      scrollEnabled={false} // it's just a header block
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row} // spacing between columns
      renderItem={({ item }) => (
        <View style={styles.col}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {item.label}: <Text style={styles.pillValue}>{item.value}</Text>
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 4,
    marginBottom: 12, // matches your spacing rhythm
  },
  // Each cell fills 1/3 of the row
  col: {
    flex: 1,
    marginBottom: 8,
  },
  // NOTE: RN 0.79 supports gap/columnGap in many cases, but to be safe:
  row: {
    // Prefer gap if available in your target; otherwise use space-between + inner padding
    // @ts-ignore: gap is not typed in RN yet
    gap: 8,
    // fallback if gap isn't supported on some platforms:
    // justifyContent: 'space-between',
  },
  pill: {
    borderRadius: 9999,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  pillText: {
    fontSize: 12,
    color: '#404040',
  },
  pillValue: {
    fontWeight: '600',
  },
});
