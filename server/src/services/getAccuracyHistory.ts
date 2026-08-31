import pool from "../utils/db.js";

export interface AccuracyHistory {
  date: string;
  accuracy: number;
}

export async function getAccuracyHistory(
  timeZone: string,
): Promise<AccuracyHistory[]> {
  const STATS_PERIOD_DAYS = Number(process.env.STATS_PERIOD_DAYS ?? 14);

  const result = await pool.query(
    `
      SELECT
        (completed_at AT TIME ZONE $1)::date AS date,
        ROUND(
          ((total_reviews - total_mistakes)::numeric / total_reviews) * 100,
          1
        ) AS accuracy
      FROM review_sessions_history
      WHERE completed_at >= CURRENT_DATE
        - (($2 - 1) * INTERVAL '1 day')
        AND total_reviews > 0
      ORDER BY completed_at ASC;
    `,
    [timeZone, STATS_PERIOD_DAYS],
  );

  return result.rows.map((row) => ({
    date: row.date,
    accuracy: Number(row.accuracy),
  }));
}
