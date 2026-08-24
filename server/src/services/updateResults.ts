import pool from "../utils/db.js";

export async function updateResults(
  sessionId: number,
  results: {
    wordId: number;
    correct: boolean;
  }[],
) {
  if (!results || results.length === 0) return;
  const placeholders = results
    .map((_, index) => {
      const offset = index * 3;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
    })
    .join(", ");

  const values = results.flatMap(({ wordId, correct }) => [
    sessionId,
    wordId,
    correct,
  ]);

  const sql = `
    INSERT INTO review_results (session_id, word_id, correct)
    VALUES ${placeholders}
    ON CONFLICT (session_id, word_id)
    DO UPDATE SET correct = review_results.correct AND EXCLUDED.correct;
  `;
  await pool.query(sql, values);
}
