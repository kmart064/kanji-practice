import pool from "../utils/db.js";

export async function completeReviewSession(sessionId: number): Promise<void> {
  const result = await pool.query(
    `
      SELECT
        COUNT(*)::int AS total_reviews,
        COUNT(*) FILTER (WHERE correct = false)::int AS total_mistakes
      FROM review_results
      WHERE session_id = $1
    `,
    [sessionId],
  );

  const { total_reviews, total_mistakes } = result.rows[0];

  await pool.query(
    `
      UPDATE review_sessions_history
      SET
        completed_at = CURRENT_TIMESTAMP,
        total_reviews = $2,
        total_mistakes = $3
      WHERE session_id = $1
    `,
    [sessionId, total_reviews, total_mistakes],
  );
}
