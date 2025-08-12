import { apiFetch } from "../../../utils/apiFetch";

export async function searchKanji(kanji: string): Promise<{ kanji: string }[]> {
  return await apiFetch(`/api/search?kanji=${encodeURIComponent(kanji)}`, {
    method: "GET",
  });
}
