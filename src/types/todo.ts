// src\types\todo.ts

import { z } from 'zod';

export const Todo = z.object({
  id: z.number(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});

export type Todo = z.infer<typeof Todo>;

export const TodosPage = z.object({
  limit: z.number(),
  skip: z.number(),
  total: z.number(),
  todos: z.array(Todo),
});

export type TodosPage = z.infer<typeof TodosPage>;
