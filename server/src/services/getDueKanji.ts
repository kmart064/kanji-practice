import pool from "../utils/db.js";
import { Word } from "../models/Word.js";

/**
 * Retrieves all kanji that have a review date before or on the current day
 * @returns all kanji that have a review date before or on the current day
 */
export async function getDueKanji(): Promise<Word[]> {
  const sql = `SELECT w.id, w.kanji
                FROM words w
                JOIN srs_schedule s ON w.review_stage = s.stage
                WHERE w.review_date + s.interval_days * INTERVAL '1 day' <= CURRENT_DATE;`;
  const result = await pool.query(sql);
  const rows: Word[] = result.rows;
  return rows;
}
