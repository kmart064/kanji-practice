import { Database } from "sqlite";
import { Word } from "../models/Word.js";

export async function getAllKanji(db: Database): Promise<Word[]> {
  const selectSql = "SELECT kanji FROM words";
  return await db.all(selectSql);
}
