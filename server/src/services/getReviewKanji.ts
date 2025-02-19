import { Database } from 'sqlite';
import { KanjiRow } from '../models/KanjiRow';

export async function getReviewKanji(db: Database, reviewDate: string = ""): Promise<string[]> {  
  // if no review date provided, return all words
  if (reviewDate == "") {
    const selectSql = "SELECT kanji FROM words";
    const rows: KanjiRow[] = await db.all(selectSql);
    return (rows.map(row => row.kanji));
  }
  else {
    // To be implemented later. Return all kanji before or on the reviewDate
    return ["not yet implemented"];
  }
}
