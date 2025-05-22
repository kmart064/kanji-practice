import { Database } from "sqlite";
import { Word } from "../models/Word.js";

/**
 * Retrieves all kanji that have a review date before or on the current day
 * @param db
 * @returns all kanji that have a review date before or on the current day
 */
export async function getDueKanji(db: Database): Promise<Word[]> {
  const sql = "SELECT id, kanji FROM words WHERE review_date <= date('now')";
  return await db.all(sql);
}
