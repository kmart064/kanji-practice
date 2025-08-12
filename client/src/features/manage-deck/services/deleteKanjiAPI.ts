import { apiFetch } from "../../../utils/apiFetch";

export async function deleteKanji(
  kanjiArray: string[]
): Promise<{ message: string }> {
  return await apiFetch("/api/delete", {
    method: "DELETE",
    body: JSON.stringify({ kanji: kanjiArray }),
  });
}
