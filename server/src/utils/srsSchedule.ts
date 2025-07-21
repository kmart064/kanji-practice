import pool from "./db.js";

const DEFAULT_SCHEDULE = "0 1 2 3 7 14 30 60 180 365";

export async function syncSrsScheduleFromEnv(): Promise<void> {
  const scheduleRaw = process.env.SRS_SCHEDULE ?? DEFAULT_SCHEDULE;
  const schedule = scheduleRaw.split(" ").map(Number);

  // Check if schedule already exists
  const existing = await pool.query(
    "SELECT interval_days FROM srs_schedule ORDER BY stage ASC"
  );

  const existingSchedule = existing.rows.map((row) =>
    Number(row.interval_days)
  );

  // Only update if different
  const isDifferent =
    existingSchedule.length !== schedule.length ||
    existingSchedule.some((val, i) => val !== schedule[i]);

  if (!isDifferent) return;

  // Replace row if different
  await pool.query("DELETE FROM srs_schedule");

  const values: string[] = [];
  const params: any[] = [];

  for (let i = 0; i < schedule.length; i++) {
    values.push(`($${i * 2 + 1}, $${i * 2 + 2})`);
    params.push(i, schedule[i]);
  }

  const insertSql = `
    INSERT INTO srs_schedule (stage, interval_days)
    VALUES ${values.join(", ")}
  `;

  await pool.query(insertSql, params);
}
