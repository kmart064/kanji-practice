import { Database } from "sqlite";

/**
 * Resets the interval (index) for the SRS schedule
 * @param db
 * @param kanji
 * @returns
 */
export async function updateIncorrectKanji(db: Database, kanji: string[]) {
  if (!kanji) return;
  const placeholders = kanji.map(() => "?").join(", ");
  const sql = `UPDATE words
                SET 
                  review_stage = 0,
                  review_date = CURRENT_DATE
                WHERE kanji IN (${placeholders})`;
  await db.all(sql, kanji);
}

export async function updateCorrectKanji(db: Database, kanji: string[]) {
  if (!kanji) return;
  const placeholders = kanji.map(() => "?").join(", ");
  const sql = `UPDATE words
                SET 
                  review_stage = review_stage + 1,
                  review_date = CURRENT_DATE
                WHERE kanji IN (${placeholders})`;
  await db.all(sql, kanji);
}
