import { Database } from 'sqlite';
import { KanjiRow } from '../models/KanjiRow';

export async function getAllKanji(db: Database): Promise<string[]> {  
  const selectSql = "SELECT kanji FROM words";
    const rows: KanjiRow[] = await db.all(selectSql);
    return (rows.map(row => row.kanji));
}
