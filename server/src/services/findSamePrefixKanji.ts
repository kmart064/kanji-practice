import pool from "../utils/db.js";
import { Word } from "../models/Word.js";

/**
 * Returns all kanji that contain the same prefix as provided
 * @param kanji
 * @returns the kanji that contain the same prefix as provided
 */
export async function findSamePrefixKanji(
  kanjiPrefix: string,
): Promise<Word[]> {
  const selectSql = `SELECT kanji FROM words WHERE kanji LIKE $1`;
  const result = await pool.query(selectSql, [`${kanjiPrefix}%`]);
  const rows: Word[] = result.rows;
  return rows;
}
