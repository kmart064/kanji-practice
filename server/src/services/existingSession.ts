import { Database } from "sqlite";
import { Word } from "../models/Word.js";

export async function existingSession(
  db: Database
): Promise<number | undefined> {
  const sql = `
      SELECT session_id
      FROM review_sessions
      LIMIT 1;
  `;
  const row = await db.get(sql);
  return row?.session_id;
}

export async function getCurrentBatch(db: Database): Promise<Word[]> {
  const sql = `
    SELECT word_id, kanji
    FROM review_sessions JOIN words ON review_sessions.word_id = words.id
    WHERE status = 'batch'
  `;
  const rows = await db.all(sql);
  const reviewBatch: Word[] = rows.map((card) => ({
    id: card.word_id,
    kanji: card.kanji,
  }));
  return reviewBatch;
}
