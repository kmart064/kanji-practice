import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbInstance: Database | null = null; // Store as singleton

export async function initializeDB(dbPath: string): Promise<Database> {
  if (!dbInstance) {
    try {
      dbInstance = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });

      console.log('Connected to SQLite database.');

      // Create the table if it doesn't exist
      await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kanji TEXT NOT NULL UNIQUE,
        interval INTEGER DEFAULT 1,
        review_date DATE DEFAULT CURRENT_DATE
      )`);

      console.log('Table words is ready.');
      
      return dbInstance;
    } catch (err) {
      console.error('Error initializing database:', (err as Error).message);
      throw err;
    }
  }
  else return dbInstance;
}

export function getDB(): Database {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initializeDB first.');
  }
  return dbInstance;
}
