import { Database } from "sqlite";

export async function deleteKanjiService(db: Database, kanji: string[]) {
  try {
    if (kanji.length < 1) return;
    // remove any duplicates within the list
    const uniqueList: string[] = Array.from(new Set(kanji));

    const query = `DELETE FROM words WHERE kanji IN ${uniqueList
      .map(() => "(?)")
      .join(", ")}`;
    await db.run(query, uniqueList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Unknown error occurred when trying to delete kanji from the database"
    );
  }
}
