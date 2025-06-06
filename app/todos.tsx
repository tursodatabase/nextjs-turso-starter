// import { migrate } from "drizzle-orm/libsql/migrator";

// import { db } from "@/db";
import { getTodos } from "@/app/actions";
import { TodoList } from "./todo-list";

export async function Todos() {
  try {
    // Create the todos table if it doesn't exist
    // await migrate(db, { migrationsFolder: "./migrations" });

    // Get todos using our new raw SQL function
    const todos = await getTodos();

    return <TodoList initialTodos={todos || []} />;
  } catch (error) {
    console.error("Error loading todos:", error);
    return <p>Error loading todos. Please check the database connection.</p>;
  }
}
