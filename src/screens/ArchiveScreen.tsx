// src/screens/ArchiveScreen.tsx
import React, { useMemo, useCallback } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useArchive } from 'blank/features/archive/hooks/useArchive';
import { listStyles } from 'blank/features/todos/ui/styles';
import { HEADER_HEIGHT } from 'blank/features/todos/ui/constants';
import { containerStyles } from 'blank/ui/layout';
import {
  TodoCard,
  CARD_HEIGHT,
} from 'blank/features/todos/components/TodoCard';
import { Todo } from 'blank/types/todo';

const ITEM_GAP = 12;

const styles = StyleSheet.create({
  pageInner: { minHeight: 0 },
  list: { flex: 1 },
  separator: { height: ITEM_GAP },
});

function ArchiveSeparator() {
  return <View style={styles.separator} />;
}

export default function ArchiveScreen() {
  const { archived, unarchive, clearAll } = useArchive();

  const handleUnarchive = useCallback(
    (t: Todo) => unarchive(t.id),
    [unarchive],
  );

  const header = useMemo(
    () => (
      <View
        className="h-12 rounded-xl bg-neutral-100 p-1 flex-row justify-end"
        style={{ height: HEADER_HEIGHT }}
      >
        <Pressable
          testID="clear-archive"
          onPress={clearAll}
          className="h-full flex-row items-center justify-center gap-2 rounded-lg bg-white px-3"
          accessibilityRole="button"
          accessibilityLabel="Clear archive"
          accessibilityHint="Removes all items from the archive"
          hitSlop={6}
        >
          <Ionicons name="trash-outline" size={18} color="#404040" />
          <Text className="text-neutral-700">Clear all</Text>
        </Pressable>
      </View>
    ),
    [clearAll],
  );

  if (archived.length === 0) {
    return (
      <View className="flex-1 bg-white items-center justify-center py-12">
        <Text className="text-neutral-500">Archive is empty.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-4" style={styles.pageInner}>
        <FlatList
          style={[containerStyles.center, styles.list]}
          data={archived}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={listStyles.content}
          ListHeaderComponent={header}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={ArchiveSeparator}
          renderItem={({ item }) => (
            <TodoCard item={item} isArchived onUnarchive={handleUnarchive} />
          )}
          getItemLayout={(_d, index) => ({
            length: CARD_HEIGHT,
            offset: HEADER_HEIGHT + CARD_HEIGHT * index,
            index,
          })}
        />
      </View>
    </View>
  );
}
