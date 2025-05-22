import { Database } from "sqlite";
import { Word } from "../models/Word";

export async function getKanjiIds(
  db: Database,
  kanji: string[]
): Promise<Word[]> {
  // Return an empty array if no kanji words are provided
  if (!kanji || kanji.length === 0) {
    return [];
  }

  // Create placeholders for the SQL query (?, ?, ?)
  const placeholders = kanji.map(() => "?").join(", ");

  return await db.all(
    `SELECT id, kanji FROM words WHERE kanji IN (${placeholders})`,
    kanji
  );
}
