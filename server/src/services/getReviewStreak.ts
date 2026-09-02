import pool from "../utils/db.js";

export async function getReviewStreak(): Promise<number> {
  const result = await pool.query(`
    SELECT completed_at
    FROM review_sessions_history
    WHERE completed_at IS NOT NULL
    ORDER BY completed_at DESC
  `);

  if (result.rows.length === 0) {
    return 0;
  }

  const STREAK_LIMIT = Number(process.env.STREAK_LIMIT ?? 24);
  const latestReview = new Date(result.rows[0].completed_at);
  const now = new Date();

  const hoursSinceLatest =
    (now.getTime() - latestReview.getTime()) / (1000 * 60 * 60);

  // No review within the last STREAK_LIMIT hours means the streak is broken.
  if (hoursSinceLatest > STREAK_LIMIT) {
    return 0;
  }

  let streak = 1;

  for (let i = 1; i < result.rows.length; i++) {
    const previousReview = new Date(result.rows[i - 1].completed_at);
    const currentReview = new Date(result.rows[i].completed_at);

    const hoursBetween =
      (previousReview.getTime() - currentReview.getTime()) / (1000 * 60 * 60);

    if (hoursBetween > STREAK_LIMIT) {
      break;
    }

    streak++;
  }

  return streak;
}
