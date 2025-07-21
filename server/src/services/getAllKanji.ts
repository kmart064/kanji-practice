import { Word } from "../models/Word.js";
import pool from "../utils/db.js";

export async function getAllKanji(): Promise<Word[]> {
  const selectSql = "SELECT kanji FROM words";
  const result = await pool.query(selectSql);
  const rows: Word[] = result.rows;
  return rows;
}
