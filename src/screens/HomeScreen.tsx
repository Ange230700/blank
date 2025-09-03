// src/screens/HomeScreen.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  type FlatList as RNFlatList,
} from 'react-native';
import type { Todo } from 'blank/types/todo';
import { useTodos } from 'blank/features/todos/hooks/useTodos';
import { TodoRow } from 'blank/features/todos/components/TodoRow';
import { TodosHeader } from 'blank/features/todos/components/TodosHeader';
import { HEADER_HEIGHT, ROW_HEIGHT } from 'blank/features/todos/ui/constants';
import { listStyles } from 'blank/features/todos/ui/styles';

export default function HomeScreen() {
  const { shown, filter, setFilter, error, refreshing, reload, onToggle } =
    useTodos();

  const listRef = useRef<RNFlatList<Todo>>(null);

  const jumpToIndex = useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const onScrollToIndexFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      listRef.current?.scrollToOffset({
        offset: Math.max(
          0,
          HEADER_HEIGHT + info.index * ROW_HEIGHT - info.averageItemLength,
        ),
        animated: true,
      });
      setTimeout(
        () =>
          listRef.current?.scrollToIndex({ index: info.index, animated: true }),
        250,
      );
    },
    [],
  );

  const headerEl = useMemo(
    () => (
      <TodosHeader
        filter={filter}
        onChangeFilter={setFilter}
        onJumpTo21={() => jumpToIndex(20)}
      />
    ),
    [filter, setFilter, jumpToIndex],
  );

  return (
    <View className="flex-1 p-4 bg-white dark:bg-neutral-900">
      {error && (
        <View className="mb-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 p-3">
          <Text className="text-red-800 dark:text-red-300">{error}</Text>
        </View>
      )}

      {shown.length === 0 && !error ? (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-neutral-500 dark:text-neutral-400">
            No todos match this filter.
          </Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          contentContainerStyle={listStyles.content}
          data={shown}
          keyExtractor={(i) => String(i.id)}
          ListHeaderComponent={headerEl}
          stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload} />
          }
          renderItem={({ item }) => <TodoRow item={item} onToggle={onToggle} />}
          initialNumToRender={10}
          windowSize={5}
          maxToRenderPerBatch={10}
          removeClippedSubviews
          getItemLayout={(_data, index) => ({
            length: ROW_HEIGHT,
            offset: HEADER_HEIGHT + ROW_HEIGHT * index,
            index,
          })}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
      )}
    </View>
  );
}
