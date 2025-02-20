import { Database } from 'sqlite';
import { KanjiRow } from '../models/KanjiRow';

/**
 * Retrieves all kanji that have a review date before or on the current day
 * @param db 
 * @returns all kanji that have a review date before or on the current day
 */
export async function getDueKanji(db: Database): Promise<KanjiRow[]> {
  const sql = "SELECT * FROM words WHERE review_date <= date('now')";
  return await db.all(sql);
}
