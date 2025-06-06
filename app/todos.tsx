import { getTodos } from "@/app/actions";
import { TodoList } from "./todo-list";

export async function Todos() {
  try {
    const todos = await getTodos();

    return <TodoList initialTodos={todos || []} />;
  } catch (error) {
    console.error("Error loading todos:", error);
    return <p>Error loading todos. Please check the database connection.</p>;
  }
}
