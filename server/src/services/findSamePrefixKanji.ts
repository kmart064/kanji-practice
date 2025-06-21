import { Database } from "sqlite";
import { Word } from "../models/Word";

/**
 * Returns all kanji that contain the same prefix as provided
 * @param db
 * @param kanji
 * @returns the kanji that contain the same prefix as provided
 */
export async function findSamePrefixKanji(
  db: Database,
  kanjiPrefix: string
): Promise<Word[]> {
  const selectSql = `SELECT kanji FROM words WHERE kanji LIKE ?`;
  return await db.all(selectSql, [`${kanjiPrefix}%`]);
}
