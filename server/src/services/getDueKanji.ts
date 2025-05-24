import { Database } from "sqlite";
import { Word } from "../models/Word.js";

/**
 * Retrieves all kanji that have a review date before or on the current day
 * @param db
 * @returns all kanji that have a review date before or on the current day
 */
export async function getDueKanji(db: Database): Promise<Word[]> {
  const sql = `SELECT id, kanji 
                FROM words w
                JOIN srs_schedule s ON w.review_stage = s.stage                 
                WHERE DATE(w.review_date, '+' || s.interval_days || ' days') <= DATE('now')`;
  return await db.all(sql);
}
