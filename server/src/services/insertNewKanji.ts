import pool from "../utils/db.js";

/**
 * Inserts the provided kanji into the database
 * @param newKanji
 * @returns the kanji inserted
 */
export async function insertNewKanji(newKanji: string[]): Promise<string[]> {
  if (newKanji.length === 0) {
    return [];
  }

  const placeholders = newKanji.map((_, i) => `($${i + 1})`).join(", ");

  const insertSql = `INSERT INTO words (kanji) VALUES ${placeholders}`;

  await pool.query(insertSql, newKanji);

  return newKanji;
}
