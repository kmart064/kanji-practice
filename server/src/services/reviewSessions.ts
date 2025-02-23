import { Database } from 'sqlite';

export async function startNewSession(db: Database): Promise<number> {
  const result = await db.run(
    `INSERT INTO review_sessions (correctly_reviewed, incorrectly_reviewed) VALUES ('[]', '[]')`
  );
  return result.lastID as number;
}

export async function getSession(db: Database, sessionId: number) {
  return db.get(`SELECT * FROM review_sessions WHERE id = ?`, sessionId);
}

export async function updateSession(
  db: Database,
  sessionId: number,
  correctKanji: string[],
  incorrectKanji: string[]
) {
  await db.run(
    `UPDATE review_sessions 
     SET correctly_reviewed = json_patch(correctly_reviewed, json(?)),
         incorrectly_reviewed = json_patch(incorrectly_reviewed, json(?))
     WHERE id = ?`,
    [JSON.stringify(correctKanji), JSON.stringify(incorrectKanji), sessionId]
  );
}

export async function completeSession(db: Database, sessionId: number) {
  await db.run(`UPDATE review_sessions SET status = 'completed' WHERE id = ?`, sessionId);
}
