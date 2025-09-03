// src/screens/HomeScreen.tsx

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  Pressable,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { listTodos, toggleTodo } from 'blank/services/todos';
import type { Todo } from 'blank/types/todo';

const ROW_HEIGHT = 56;
const HEADER_HEIGHT = 48;

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const listRef = useRef<FlatList<Todo>>(null);

  const styles = StyleSheet.create({
    listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  });

  useEffect(() => {
    (async () => {
      try {
        const page = await listTodos(30, 0);
        setTodos(page.todos);
      } catch (e) {
        setError(`Error loading todos: ${e}`);
      }
    })();
  }, []);

  const shown = useMemo(() => {
    if (filter === 'completed') return todos.filter((t) => t.completed);
    if (filter === 'pending') return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  const onToggle = useCallback(async (t: Todo) => {
    setTodos((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, completed: !x.completed } : x)),
    );
    try {
      await toggleTodo(t.id, !t.completed);
    } catch {}
  }, []);

  const reload = useCallback(async () => {
    setRefreshing(true);
    try {
      const page = await listTodos(30, 0);
      setTodos(page.todos);
      setError(null);
    } catch {
      setError('Failed to refresh.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // 👇 Programmatic jump
  const jumpToIndex = useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  // 👇 Make jump robust if item isn’t measured yet
  const onScrollToIndexFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      listRef.current?.scrollToOffset({
        offset: Math.max(
          0,
          HEADER_HEIGHT + info.index * ROW_HEIGHT - info.averageItemLength,
        ),
        animated: true,
      });
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: info.index, animated: true });
      }, 250);
    },
    [],
  );

  const Header = useMemo(
    () => (
      <View
        className="mb-2"
        // Wrap filters + an example "Jump" action
      >
        {/* Filters */}
        <View
          className="flex-row gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1 h-12"
          style={{ height: HEADER_HEIGHT }}
          accessibilityRole="tablist"
          testID="filters"
        >
          {(['all', 'completed', 'pending'] as const).map((k) => {
            const selected = filter === k;
            return (
              <Pressable
                key={k}
                testID={`filter-${k}`}
                onPress={() => setFilter(k)}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                accessibilityLabel={`Show ${k} todos`}
                accessibilityHint="Filters the list below"
                hitSlop={6}
                className={`flex-1 items-center justify-center rounded-lg ${
                  selected ? 'bg-white dark:bg-neutral-700' : ''
                }`}
              >
                <Text
                  className={`capitalize ${
                    selected
                      ? 'font-bold text-blue-600 dark:text-blue-400'
                      : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {k}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-row justify-end mt-2">
          <Pressable
            testID="jump-to-21"
            onPress={() => jumpToIndex(20)}
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
    ),
    [filter, jumpToIndex],
  );

  return (
    <View className="flex-1 p-4 bg-white dark:bg-neutral-900">
      {/* Filters */}
      <View
        className="flex-row gap-2 mb-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1"
        accessibilityRole="tablist"
      >
        {(['all', 'completed', 'pending'] as const).map((k) => {
          const selected = filter === k;
          return (
            <Pressable
              key={k}
              onPress={() => setFilter(k)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              accessibilityLabel={`Show ${k} todos`}
              accessibilityHint=""
              hitSlop={6}
              className={`flex-1 items-center py-2 rounded-lg ${selected ? 'bg-white dark:bg-neutral-700' : ''}`}
            >
              <Text
                className={`capitalize ${selected ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-neutral-600 dark:text-neutral-300'}`}
              >
                {k}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error && (
        <View className="mb-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 p-3">
          <Text className="text-red-800 dark:text-red-300">{error}</Text>
        </View>
      )}
      {/* Todos list */}
      {shown.length === 0 && !error ? (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-neutral-500 dark:text-neutral-400">
            No todos match this filter.
          </Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          contentContainerStyle={styles.listContent}
          data={shown}
          keyExtractor={(i) => String(i.id)}
          ListHeaderComponent={Header}
          stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload} />
          }
          renderItem={({ item }) => (
            <View
              className="h-14 flex-row items-center justify-between border-b border-neutral-200 dark:border-neutral-700 py-3"
              accessible
              accessibilityLabel={`Todo: ${item.todo}`}
            >
              <Text
                numberOfLines={1}
                className={`${
                  item.completed
                    ? 'line-through opacity-60 text-neutral-500'
                    : 'text-neutral-900 dark:text-neutral-100'
                }`}
              >
                {item.todo}
              </Text>
              <Switch
                testID={`todo-switch-${item.id}`}
                value={item.completed}
                onValueChange={() => onToggle(item)}
                accessibilityRole="switch"
                accessibilityLabel={`Mark as ${item.completed ? 'pending' : 'completed'}`}
                hitSlop={6}
              />
            </View>
          )}
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
