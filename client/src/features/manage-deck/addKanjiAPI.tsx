import { apiFetch } from "../../utils/apiFetch";

export async function addKanji(
  kanjiArray: string[]
): Promise<{ message: string; inserted: string; duplicates: string }> {
  return await apiFetch("/api/add", {
    method: "POST",
    body: JSON.stringify({ kanji: kanjiArray }),
  });
}
