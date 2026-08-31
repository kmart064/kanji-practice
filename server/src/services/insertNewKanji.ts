import pool from "../utils/db.js";

/**
 * Inserts the provided kanji into the database
 * @param newKanji
 * @param timeZone User's IANA time zone
 * @returns the kanji inserted
 */
export async function insertNewKanji(
  newKanji: string[],
  timeZone: string,
): Promise<string[]> {
  if (newKanji.length === 0) {
    return [];
  }

  const placeholders = newKanji.map((_, i) => `($${i + 2})`).join(", ");

  const insertSql = `
    INSERT INTO words (kanji, date_added)
    SELECT v.kanji, (CURRENT_TIMESTAMP AT TIME ZONE $1)::date
    FROM (VALUES ${placeholders}) AS v(kanji)
  `;

  await pool.query(insertSql, [timeZone, ...newKanji]);

  return newKanji;
}
