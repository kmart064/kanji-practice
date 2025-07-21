import pool from "../utils/db.js";
import { Word } from "../models/Word.js";

export async function existingSession(): Promise<number | undefined> {
  const sql = `
      SELECT session_id
      FROM review_sessions
      LIMIT 1;
  `;
  const result = await pool.query(sql);
  return result.rows[0]?.session_id;
}

export async function getCurrentBatch(): Promise<Word[]> {
  const sql = `
    SELECT word_id, kanji
    FROM review_sessions JOIN words ON review_sessions.word_id = words.id
    WHERE status = 'batch'
  `;
  const result = await pool.query(sql);
  const reviewBatch: Word[] = result.rows.map((card) => ({
    id: card.word_id,
    kanji: card.kanji,
  }));
  return reviewBatch;
}
