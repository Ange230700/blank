// tests\mocks\factories\todo.ts

import { faker } from '@faker-js/faker';
import type { Todo, TodosPage } from 'blank/types/todo';

export function makeTodo(id: number, userId: number): Todo {
  return {
    id,
    userId,
    todo: faker.hacker.verb() + ' ' + faker.hacker.noun(),
    completed: faker.datatype.boolean(),
  };
}

export function makeTodosPageByUser(
  userId: number,
  count = 30,
  skip = 0,
): TodosPage {
  const todos = Array.from({ length: count }, (_, i) =>
    makeTodo(skip + i + 1, userId),
  );
  return { limit: count, skip, total: 200, todos };
}
