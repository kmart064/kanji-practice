import { Database } from "sqlite";

/**
 * Inserts the provided kanji into the database
 * @param db 
 * @param newKanji 
 * @returns the kanji inserted
 */
export async function insertNewKanji(db: Database, newKanji: string[]): Promise<string[]> {
    if (newKanji.length === 0) {
      return [];
    }

    const insertSql = `INSERT INTO words (kanji) VALUES ${newKanji.map(() => '(?)').join(', ')}`;
    await db.run(insertSql, newKanji);

    return newKanji;
}
