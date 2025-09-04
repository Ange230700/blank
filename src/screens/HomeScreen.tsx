// src/screens/HomeScreen.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  type FlatList as RNFlatList,
  StyleSheet,
  type FlatListProps,
} from 'react-native';
import type { Todo } from 'blank/types/todo';
import { useTodos } from 'blank/features/todos/hooks/useTodos';
import { TodoRow } from 'blank/features/todos/components/TodoRow';
import {
  TodoCard,
  CARD_HEIGHT,
} from 'blank/features/todos/components/TodoCard';
import { TodosHeader } from 'blank/features/todos/components/TodosHeader';
import { StatsPills } from 'blank/features/todos/components/StatsPills';
import { HEADER_HEIGHT, ROW_HEIGHT } from 'blank/features/todos/ui/constants';
import { layoutStyles, listStyles } from 'blank/features/todos/ui/styles';
import { useArchive } from 'blank/features/archive/hooks/useArchive';
import { containerStyles } from 'blank/ui/layout';
import { useGridColumns } from 'blank/ui/responsive';

const GRID_GAP = 16;

export default function HomeScreen() {
  const {
    todos,
    shown,
    filter,
    setFilter,
    error,
    refreshing,
    reload,
    onToggle,
  } = useTodos();
  const { archive, isArchived } = useArchive();

  const handleArchive = useCallback((t: Todo) => archive(t), [archive]);

  const listRef = useRef<RNFlatList<Todo>>(null);
  const cols = useGridColumns();

  const perfProps = useMemo<Partial<FlatListProps<Todo>>>(() => {
    const common = { removeClippedSubviews: true } as const;

    if (cols <= 1) {
      return {
        ...common,
        initialNumToRender: 10,
        windowSize: 5,
        maxToRenderPerBatch: 10,
        getItemLayout: (_d: unknown, index: number) => ({
          length: ROW_HEIGHT,
          offset: HEADER_HEIGHT + ROW_HEIGHT * index,
          index,
        }),
      };
    }

    return {
      ...common,
      initialNumToRender: 12,
      windowSize: 7,
      maxToRenderPerBatch: 12,
    };
  }, [cols]);

  const onScrollToIndexFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      if (cols <= 1) {
        listRef.current?.scrollToOffset({
          offset: Math.max(
            0,
            HEADER_HEIGHT + info.index * ROW_HEIGHT - info.averageItemLength,
          ),
          animated: true,
        });
      } else {
        const row = Math.floor(info.index / cols);
        const approx = HEADER_HEIGHT + row * (CARD_HEIGHT + GRID_GAP);
        listRef.current?.scrollToOffset({ offset: approx, animated: true });
      }
      setTimeout(
        () =>
          listRef.current?.scrollToIndex({ index: info.index, animated: true }),
        250,
      );
    },
    [cols],
  );

  const headerEl = useMemo(
    () => <TodosHeader filter={filter} onChangeFilter={setFilter} />,
    [filter, setFilter],
  );

  const counts = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return {
      total: todos.length,
      completed,
      pending: todos.length - completed,
    };
  }, [todos]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-4" style={layoutStyles.inner}>
        {error && (
          <View className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3">
            <Text className="text-red-800">{error}</Text>
          </View>
        )}

        <StatsPills
          total={counts.total}
          completed={counts.completed}
          pending={counts.pending}
        />

        {shown.length === 0 && !error ? (
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-neutral-500">
              No todos match this filter.
            </Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            style={containerStyles.center}
            contentContainerStyle={listStyles.content}
            data={shown}
            keyExtractor={(i) => String(i.id)}
            numColumns={cols}
            columnWrapperStyle={cols > 1 ? styles.columnWrapper : undefined}
            ListHeaderComponent={headerEl}
            stickyHeaderIndices={[0]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={reload} />
            }
            renderItem={({ item }) =>
              cols > 1 ? (
                <View style={styles.cell}>
                  <TodoCard
                    item={item}
                    onToggle={onToggle}
                    onArchive={handleArchive}
                    isArchived={isArchived(item.id)}
                  />
                </View>
              ) : (
                <TodoRow
                  item={item}
                  onToggle={onToggle}
                  onArchive={handleArchive}
                  isArchived={isArchived(item.id)}
                />
              )
            }
            {...perfProps}
            onScrollToIndexFailed={onScrollToIndexFailed}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    columnGap: GRID_GAP,
  },
  cell: {
    flex: 1,
    marginBottom: GRID_GAP,
  },
});
