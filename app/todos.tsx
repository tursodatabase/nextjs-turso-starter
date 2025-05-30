import { getTodos } from "@/app/actions";
import { createTodosTable } from "@/app/utils";
import { TodoList } from "./todo-list";

export async function Todos() {
  try {
    // Create the todos table if it doesn't exist
    await createTodosTable();
    
    // Get todos using our new raw SQL function
    const todos = await getTodos();
    
    return <TodoList initialTodos={todos || []} />;
  } catch (error) {
    console.error("Error loading todos:", error);
    return <p>Error loading todos. Please check the database connection.</p>;
  }
}