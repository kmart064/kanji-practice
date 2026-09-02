import pool from "../utils/db.js";

export async function getNewWordCount(): Promise<number> {
  const STATS_PERIOD_DAYS = Number(process.env.STATS_PERIOD_DAYS ?? 6);

  const result = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM words
    WHERE date_added >= CURRENT_DATE - ($1 * INTERVAL '1 day')
      AND date_added <= CURRENT_DATE
  `,
    [STATS_PERIOD_DAYS],
  );

  return Number(result.rows[0].count);
}
