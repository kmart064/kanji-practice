import pool from "../utils/db.js";
import { Word } from "../models/Word";

/**
 * Checks whether the provided kanji already exist in the database, and returns the ones
 * that do
 * @param kanji
 * @returns the kanji that already exist in the database based on the ones provided
 */
export async function checkDuplicateKanji(kanji: string[]): Promise<Word[]> {
  const placeholders = kanji.map((_, index) => `$${index + 1}`).join(", ");
  const selectSql = `SELECT kanji FROM words WHERE kanji IN (${placeholders})`;
  const result = await pool.query(selectSql, kanji);
  const rows: Word[] = result.rows;
  return rows;
}
