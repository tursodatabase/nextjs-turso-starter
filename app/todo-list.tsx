"use client";

import { useOptimistic } from "react";
import { InferSelectModel } from "drizzle-orm";

import { todosTable } from "@/db/schema";
import { Todo as TodoComponent } from "./todo";
import { Form } from "./form";

type Todo = InferSelectModel<typeof todosTable>;

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [optimisticTodos] = useOptimistic<
    Todo[],
    { action: "add" | "remove" | "toggle"; todo: Todo }
  >(initialTodos, (state, { action, todo }) => {
    switch (action) {
      case "add":
        return [...state, todo];
      case "remove":
        return state.filter((t) => t.id !== todo.id);
      case "toggle":
        return state.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t,
        );
    }
  });

  return (
    <div className="space-y-3">
      {optimisticTodos.map((todo) => (
        <TodoComponent key={todo.id} item={todo} />
      ))}
      <Form />
    </div>
  );
}
