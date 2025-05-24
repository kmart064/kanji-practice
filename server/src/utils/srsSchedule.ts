import { Database } from "sqlite";

const DEFAULT_SCHEDULE = "0 1 2 3 7 14 30 60 180 365";

export async function syncSrsScheduleFromEnv(db: Database) {
  const scheduleRaw = process.env.SRS_SCHEDULE ?? DEFAULT_SCHEDULE;

  const schedule = scheduleRaw.split(" ").map(Number);

  await db.run("DELETE FROM srs_schedule");

  const insertStmt = await db.prepare(
    "INSERT INTO srs_schedule (stage, interval_days) VALUES (?, ?)"
  );
  for (let i = 0; i < schedule.length; i++) {
    await insertStmt.run(i, schedule[i]);
  }
  await insertStmt.finalize();
}
