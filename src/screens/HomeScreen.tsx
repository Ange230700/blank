// src\screens\HomeScreen.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, Switch, Pressable } from 'react-native';
import { useAuth } from 'blank/stores/authStore';
import { listTodosByUser, toggleTodo } from 'blank/services/todos';
import type { Todo } from 'blank/types/todo';
import { useFavs } from 'blank/stores/favsStore';

export default function HomeScreen() {
  const { user, hydrate } = useAuth();
  const { togglePin, isPinned } = useFavs();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    hydrate();
  }, [hydrate]);
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

  async function onToggle(t: Todo) {
    setTodos((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, completed: !x.completed } : x)),
    );
    try {
      await toggleTodo(t.id, !t.completed);
    } catch {}
  }

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
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between border-b py-3">
            <Pressable
              onLongPress={() => togglePin(item.id)}
              className="flex-1 pr-4"
            >
              <Text className={item.completed ? 'line-through opacity-60' : ''}>
                {item.todo} {isPinned(item.id) ? '📌' : ''}
              </Text>
            </Pressable>
            <Switch
              value={item.completed}
              onValueChange={() => onToggle(item)}
            />
          </View>
        )}
      />
    </View>
  );
}
