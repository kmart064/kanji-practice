import { Word } from "../models/Word";
import pool from "../utils/db.js";

export async function getKanjiIds(kanji: string[]): Promise<Word[]> {
  if (!kanji || kanji.length === 0) {
    return [];
  }

  const placeholders = kanji.map((_, index) => `$${index + 1}`).join(", ");

  const query = `SELECT id, kanji FROM words WHERE kanji IN (${placeholders})`;
  const result = await pool.query(query, kanji);

  return result.rows as Word[];
}
