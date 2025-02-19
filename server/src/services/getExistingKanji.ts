import { Database } from 'sqlite';
import { KanjiRow } from '../models/KanjiRow';

/**
 * Checks whether the provided kanji already exist in the database, and returns the ones
 * that do
 * @param db 
 * @param kanji
 * @returns the kanji that already exist in the database based on the ones provided
 */
export async function getExistingKanji(db: Database, kanji: string[]): Promise<string[]> {  
    const placeholders = kanji.map(() => "?").join(", ");
    const selectSql = `SELECT kanji FROM words WHERE kanji IN (${placeholders})`;
    const rows: KanjiRow[] = await db.all(selectSql, kanji);
    return (rows.map(row => row.kanji));
}
