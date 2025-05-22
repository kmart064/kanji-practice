import { Database } from "sqlite";

export async function updateIncorrectKanji(db: Database, kanji: string[]) {
  if (!kanji) return;
  const placeholders = kanji.map(() => "?").join(", ");
  const sql = `UPDATE words
                SET interval = 0
                WHERE kanji IN (${placeholders})`;
  await db.all(sql, kanji);
}

export async function updateCorrectKanji(db: Database, kanji: string[]) {
  if (!kanji) return;
  const placeholders = kanji.map(() => "?").join(", ");
  const sql = `UPDATE words
                SET interval = 1
                WHERE kanji IN (${placeholders})`;
  await db.all(sql, kanji);
}
