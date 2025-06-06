"use server";

import { revalidatePath } from "next/cache";
import { eq, not } from "drizzle-orm";

import { db } from "@/db";
import { todosTable } from "@/db/schema";

export async function addTodo(formData: FormData) {
  const description = formData.get("description") as string;

  await db.insert(todosTable).values({
    description,
  });

  revalidatePath("/");
}

export async function removeTodoAction(id: number) {
  await db.delete(todosTable).where(eq(todosTable.id, id));

  revalidatePath("/");
}

export async function toggleTodoAction(id: number) {
  await db
    .update(todosTable)
    .set({
      completed: not(todosTable.completed),
    })
    .where(eq(todosTable.id, id));

  revalidatePath("/");
}

export async function getTodos() {
  return await db.select().from(todosTable);
}
