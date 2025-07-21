import pool from "../utils/db.js";

export async function deleteKanjiService(kanji: string[]) {
  try {
    if (kanji.length < 1) return;
    const uniqueList = Array.from(new Set(kanji));

    const placeholders = uniqueList.map((_, i) => `$${i + 1}`).join(", ");
    const query = `DELETE FROM words WHERE kanji IN (${placeholders})`;

    await pool.query(query, uniqueList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Unknown error occurred when trying to delete kanji from the database"
    );
  }
}
