// src\services\todos.ts

import http from './http';
import { TodosPage, Todo } from 'blank/types/todo';

export async function listTodos(limit = 30, skip = 0) {
  const { data } = await http.get('/todos', { params: { limit, skip } });
  return TodosPage.parse(data);
}

export async function listTodosByUser(userId: number, limit = 30, skip = 0) {
  const { data } = await http.get(`/todos/user/${userId}`, {
    params: { limit, skip },
  });
  return TodosPage.parse(data);
}

export async function toggleTodo(id: number, completed: boolean) {
  // Simulated on DummyJSON; treat as echo
  const { data } = await http.put(`/todos/${id}`, { completed });
  return Todo.parse(data);
}
