import { Database } from "sqlite";
import { Word } from "../models/Word";

/**
 * Checks whether the provided kanji already exist in the database, and returns the ones
 * that do
 * @param db
 * @param kanji
 * @returns the kanji that already exist in the database based on the ones provided
 */
export async function checkDuplicateKanji(
  db: Database,
  kanji: string[]
): Promise<Word[]> {
  const placeholders = kanji.map(() => "?").join(", ");
  const selectSql = `SELECT kanji FROM words WHERE kanji IN (${placeholders})`;
  return await db.all(selectSql, kanji);
}
