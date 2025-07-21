import pool from "../utils/db.js";
import { ReviewEntry } from "../models/ReviewEntry.js";

export async function startNewSession(): Promise<number> {
  const result = await pool.query(
    "INSERT INTO sessions (created_at) VALUES (CURRENT_TIMESTAMP) RETURNING id"
  );

  const newId = result.rows[0]?.id;

  if (typeof newId !== "number") {
    throw new Error("Failed to create new session.");
  }

  return newId;
}

export async function getSession(
  sessionId: number
): Promise<ReviewEntry[] | undefined> {
  const sql = `
    SELECT review_sessions.word_id, words.kanji, review_sessions.status
    FROM review_sessions
    JOIN words ON review_sessions.word_id = words.id
    WHERE session_id = $1 AND status != 'correct'
  `;

  const result = await pool.query(sql, [sessionId]);

  return result.rows;
}

export async function updateSession(
  sessionId: number,
  reviews: ReviewEntry[]
): Promise<void> {
  if (!reviews || reviews.length === 0) return;

  const placeholders = reviews
    .map((_, index) => {
      const offset = index * 3;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
    })
    .join(", ");

  const values = reviews.flatMap(({ wordId, status }) => [
    sessionId,
    wordId,
    status,
  ]);

  const sql = `
    INSERT INTO review_sessions (session_id, word_id, status)
    VALUES ${placeholders}
    ON CONFLICT (session_id, word_id)
    DO UPDATE SET status = EXCLUDED.status;
  `;

  await pool.query(sql, values);
}

export async function deleteSession(sessionId: number) {
  await pool.query(`DELETE FROM sessions WHERE id = $1`, [sessionId]);
}
