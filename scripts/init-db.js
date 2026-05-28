/**
 * One-time / repeatable setup: create schema and load sample rows.
 *
 * Run: npm run init-db
 * Safe for class demos: it deletes all users then re-inserts the same fake data (ids will change over time).
 */

import { getDb, getSqlitePath } from "../lib/db.js";

function main() {
  const db = getDb();

  // IF NOT EXISTS = safe to run every time; won't wipe an existing file, only ensures the table exists.
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Clear table so every init run starts from the same seed set (classroom repeatability).
  db.exec("DELETE FROM users");

  // One prepared INSERT reused in the loop (slightly more efficient than preparing inside the loop).
  const insert = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
  );
  
  const users = [
    ["Alice Carter", "alice@example.com", "passwordAlice"],
    ["Bob Singh", "bob@example.com", "passwordBob"],
    ["Carol Diaz", "carol@example.com", "passwordCarol"],
    ["Dan Wu", "dan@example.com", "passwordDan"],
    ["Eve Martin", "eve@example.com", "passwordEve"],
  ];

  for (const [name, email, password] of users) insert.run(name, email, password);

  const rows = db.prepare("SELECT id, name, email, password FROM users ORDER BY id").all();
 
  console.log(`SQLite database file: ${getSqlitePath()}`);
  console.log(`Seeded ${rows.length} users:`);
  console.table(rows);
}

main();
