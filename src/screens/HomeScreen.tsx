// src/screens/HomeScreen.tsx

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, FlatList, Switch, Pressable } from 'react-native';
import { listTodos, toggleTodo } from 'blank/services/todos';
import type { Todo } from 'blank/types/todo';

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    (async () => {
      const page = await listTodos(30, 0);
      setTodos(page.todos);
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

  return (
    <View className="flex-1 p-4 bg-white dark:bg-neutral-900">
      {/* Filters */}
      <View className="flex-row gap-4 mb-3" accessibilityRole="tablist">
        {(['all', 'completed', 'pending'] as const).map((k) => (
          <Pressable
            key={k}
            onPress={() => setFilter(k)}
            accessibilityRole="tab"
            accessibilityState={{ selected: filter === k }}
            accessibilityLabel={`Show ${k} todos`}
          >
            <Text
              className={`capitalize ${
                k === filter
                  ? 'font-bold text-blue-600 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {k}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Todos list */}
      <FlatList
        data={shown}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <View
            className="flex-row items-center justify-between border-b border-neutral-200 dark:border-neutral-700 py-3"
            accessible
            accessibilityLabel={`Todo: ${item.todo}`}
          >
            <Text
              className={`${
                item.completed
                  ? 'line-through opacity-60 text-neutral-500'
                  : 'text-neutral-900 dark:text-neutral-100'
              }`}
            >
              {item.todo}
            </Text>
            <Switch
              value={item.completed}
              onValueChange={() => onToggle(item)}
              accessibilityRole="switch"
              accessibilityLabel={`Mark as ${item.completed ? 'pending' : 'completed'}`}
            />
          </View>
        )}
      />
    </View>
  );
}
