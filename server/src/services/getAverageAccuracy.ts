import pool from "../utils/db.js";

export async function getAverageAccuracy(): Promise<number> {
  const STATS_PERIOD_DAYS = Number(process.env.STATS_PERIOD_DAYS ?? 6);

  const result = await pool.query(
    `
    SELECT
      COALESCE(SUM(total_reviews), 0) AS total_reviews,
      COALESCE(SUM(total_mistakes), 0) AS total_mistakes
    FROM review_sessions_history
    WHERE completed_at >= CURRENT_DATE
      - (($1 - 1) * INTERVAL '1 day')
  `,
    [STATS_PERIOD_DAYS],
  );

  const { total_reviews, total_mistakes } = result.rows[0];

  if (Number(total_reviews) === 0) {
    return 0;
  }

  return Math.round(
    ((Number(total_reviews) - Number(total_mistakes)) / Number(total_reviews)) *
      100,
  );
}
