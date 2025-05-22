import { Database } from "sqlite";
import { ReviewEntry } from "../models/ReviewEntry.js";

export async function startNewSession(db: Database): Promise<number> {
  const sessionResult = await db.run(
    "INSERT INTO sessions (created_at) VALUES (CURRENT_TIMESTAMP)"
  );

  return sessionResult.lastID as number;
}

export async function getSession(
  db: Database,
  sessionId: number
): Promise<ReviewEntry[] | undefined> {
  return await db.all(
    `SELECT review_sessions.word_id, words.kanji, review_sessions.status FROM review_sessions
      JOIN words ON review_sessions.word_id = words.id
     WHERE session_id = ? AND status != 'correct'`,
    sessionId
  );
}

export async function updateSession(
  db: Database,
  sessionId: number,
  reviews: ReviewEntry[]
) {
  if (reviews) {
    const placeholders = reviews.map(() => "(?, ?, ?)").join(", ");
    const values = reviews.flatMap(({ wordId, status }) => {
      return [sessionId, wordId, status];
    });

    // update the status values for the cards in the session
    if (values.length > 0) {
      await db.run(
        `INSERT INTO review_sessions (session_id, word_id, status) VALUES ${placeholders}
            ON CONFLICT(session_id, word_id) DO UPDATE SET status = excluded.status;`,
        values
      );
    }
  }
}

export async function deleteSession(db: Database, sessionId: number) {
  await db.run(`DELETE FROM sessions WHERE id = ?`, sessionId);
}
