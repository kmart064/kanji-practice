import pool from "../utils/db.js";

export async function updateIncorrectKanji(kanji: string[], timeZone: string) {
  if (!kanji || kanji.length === 0) return;

  const placeholders = kanji.map((_, index) => `$${index + 2}`).join(", ");

  const sql = `
    UPDATE words
    SET
      review_stage = 0,
      review_date = (CURRENT_TIMESTAMP AT TIME ZONE $1)::date
    WHERE kanji IN (${placeholders})
  `;

  await pool.query(sql, [timeZone, ...kanji]);
}

export async function updateCorrectKanji(kanji: string[], timeZone: string) {
  if (!kanji || kanji.length === 0) return;

  const placeholders = kanji.map((_, index) => `$${index + 2}`).join(", ");

  const sql = `
    UPDATE words
    SET
      review_stage = review_stage + 1,
      review_date = (CURRENT_TIMESTAMP AT TIME ZONE $1)::date
    WHERE kanji IN (${placeholders})
  `;

  await pool.query(sql, [timeZone, ...kanji]);
}
