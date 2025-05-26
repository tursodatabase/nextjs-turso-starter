import { createClient } from "@libsql/client";

// Default to a local sqlite database if no URL is provided
const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

let dbClient: ReturnType<typeof createClient> | null = null;

export async function getDatabaseClient() {
  if (!dbClient) {
    dbClient = createClient({
      url,
      authToken,
    });
  }

  return dbClient;
}

export async function createTodosTable() {
  const client = await getDatabaseClient();

  await client.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);

  return client;
}
