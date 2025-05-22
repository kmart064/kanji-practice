import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let dbInstance: Database | null = null; // Store as singleton

export async function initializeDB(dbPath: string): Promise<Database> {
  if (!dbInstance) {
    try {
      dbInstance = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      console.log("Connected to SQLite database.");

      await dbInstance.exec(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kanji TEXT NOT NULL UNIQUE,
        interval INTEGER DEFAULT 1,
        review_date DATE DEFAULT CURRENT_DATE
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS review_sessions (
          session_id INTEGER,
          status TEXT CHECK(status IN ('batch', 'deck', 'correct', 'incorrect')) NOT NULL DEFAULT 'deck',
          word_id INTEGER,
          PRIMARY KEY (session_id, word_id),
          FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
          FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
      );
      `);

      console.log("Database initialized!");

      return dbInstance;
    } catch (err) {
      console.error("Error initializing database:", (err as Error).message);
      throw err;
    }
  } else return dbInstance;
}

export function getDB(): Database {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call initializeDB first.");
  }
  return dbInstance;
}
