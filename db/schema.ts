import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
  id: integer().primaryKey({ autoIncrement: true }),
  description: text().notNull(),
  completed: integer({ mode: "boolean" }).notNull().default(false),
});
