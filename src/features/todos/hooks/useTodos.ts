// src/features/todos/hooks/useTodos.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import { listTodos, toggleTodo } from 'blank/services/todos';
import type { Todo } from 'blank/types/todo';
import type { TodoFilter } from 'blank/features/todos/ui/constants';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const page = await listTodos(30, 0);
      setTodos(page.todos);
      setError(null);
    } catch (e) {
      setError(`Error loading todos: ${String(e)}`);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reload = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  const onToggle = useCallback(async (t: Todo) => {
    setTodos((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, completed: !x.completed } : x)),
    );
    try {
      await toggleTodo(t.id, !t.completed);
    } catch {
      /* no-op */
    }
  }, []);

  const shown = useMemo(() => {
    if (filter === 'completed') return todos.filter((t) => t.completed);
    if (filter === 'pending') return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  return {
    todos,
    shown,
    filter,
    setFilter,
    error,
    refreshing,
    reload,
    onToggle,
  };
}
