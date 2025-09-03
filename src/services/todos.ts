// src\services\todos.ts

import http from 'blank/services/http';
import { TodosPage, Todo } from 'blank/types/todo';

export async function listTodos(limit = 30, skip = 0) {
  const { data } = await http.get('/todos', { params: { limit, skip } });
  return TodosPage.parse(data);
}

export async function toggleTodo(id: number, completed: boolean) {
  const { data } = await http.put(`/todos/${id}`, { completed });
  return Todo.parse(data);
}
