export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

export const TODO_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0
)
`;