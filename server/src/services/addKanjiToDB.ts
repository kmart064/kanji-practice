import { Database } from 'sqlite';
import { checkDuplicateKanji } from "./checkDuplicateKanji.js";
import { insertNewKanji } from "./insertNewKanji.js";

/**
 * Adds the provided kanji to the database if they do not already exist.
 * Will notify in the response if kanji attempting to be added are already
 * in the database.
 * @param db 
 * @param kanji 
 * @returns the successfully added and already existing kanji
 */
export async function addKanjiToDB(db: Database, kanji: string[]): Promise<any> {
  try {
    const existingKanji = await checkDuplicateKanji(db, kanji);
    const newKanji = kanji.filter(k => !existingKanji.includes(k));
    const insertedKanji = await insertNewKanji(db, newKanji);

    return {
      status: insertedKanji.length === kanji.length ? "success" : "partial",
      message:
        insertedKanji.length === kanji.length
          ? "All kanji added successfully"
          : "Some kanji were duplicates and only unique ones were added",
      inserted: insertedKanji,
      duplicates: existingKanji,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred when trying to add kanji to database");
  }
}