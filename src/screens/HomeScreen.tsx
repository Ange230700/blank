// src\screens\HomeScreen.tsx

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, FlatList, Switch, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from 'blank/stores/hooks';
import { hydrate } from 'blank/stores/slices/authSlice';
import { listTodosByUser, toggleTodo } from 'blank/services/todos';
import type { Todo } from 'blank/types/todo';
import { togglePin } from 'blank/stores/slices/favsSlice';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const pinnedIds = useAppSelector((s) => s.favs.pinnedIds); // ← select once
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const page = await listTodosByUser(user.id, 30, 0);
      setTodos(page.todos);
    })();
  }, [user]);

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
    <View className="flex-1 p-4">
      <View className="flex-row gap-4 mb-3">
        {(['all', 'completed', 'pending'] as const).map((k) => (
          <Pressable key={k} onPress={() => setFilter(k)}>
            <Text className={k === filter ? 'font-bold' : ''}>{k}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={shown}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => {
          const pinned = !!pinnedIds[item.id]; // ← no hook here
          return (
            <View className="flex-row items-center justify-between border-b py-3">
              <Pressable
                onLongPress={() => dispatch(togglePin(item.id))}
                className="flex-1 pr-4"
              >
                <Text
                  className={item.completed ? 'line-through opacity-60' : ''}
                >
                  {item.todo} {pinned ? '📌' : ''}
                </Text>
              </Pressable>
              <Switch
                value={item.completed}
                onValueChange={() => onToggle(item)}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
