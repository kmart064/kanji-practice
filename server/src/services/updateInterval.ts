import pool from "../utils/db.js";

/**
 * Resets the interval (index) for the SRS schedule
 * @param kanji
 * @returns
 */
export async function updateIncorrectKanji(kanji: string[]) {
  if (!kanji || kanji.length === 0) return;
  const placeholders = kanji.map((_, index) => `$${index + 1}`).join(", ");
  const sql = `UPDATE words
                SET 
                  review_stage = 0,
                  review_date = CURRENT_DATE
                WHERE kanji IN (${placeholders})`;
  await pool.query(sql, kanji);
}

export async function updateCorrectKanji(kanji: string[]) {
  if (!kanji || kanji.length === 0) return;
  const placeholders = kanji.map((_, index) => `$${index + 1}`).join(", ");
  const sql = `UPDATE words
                SET 
                  review_stage = review_stage + 1,
                  review_date = CURRENT_DATE
                WHERE kanji IN (${placeholders})`;
  await pool.query(sql, kanji);
}
