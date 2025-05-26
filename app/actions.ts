"use server";

import { revalidatePath } from "next/cache";
import type { Todo } from "@/db/schema";
import { getDatabaseClient } from "@/app/utils";

export type TodoItem = {
  id: number;
  description: string;
};

export async function addTodo(formData: FormData) {
  const client = await getDatabaseClient();

  const description = formData.get("description") as string;

  if (!client) return null;

  await client.execute({
    sql: "INSERT INTO todos (description) VALUES (?)",
    args: [description]
  });

  revalidatePath("/");
}

export async function removeTodoAction(id: number) {
  const client = await getDatabaseClient();

  if (!client) return null;

  await client.execute({
    sql: "DELETE FROM todos WHERE id = ?",
    args: [id]
  });

  revalidatePath("/");
}

export async function toggleTodoAction(id: number) {
  const client = await getDatabaseClient();

  if (!client) return null;

  await client.execute({
    sql: "UPDATE todos SET completed = NOT completed WHERE id = ?",
    args: [id]
  });

  revalidatePath("/");
}

export async function getTodos(): Promise<Todo[]> {
  const client = await getDatabaseClient();

  if (!client) return [];

  const result = await client.execute("SELECT * FROM todos");
  
  return result.rows.map(row => ({
    id: row.id as number,
    description: row.description as string,
    completed: Boolean(row.completed)
  }));
}