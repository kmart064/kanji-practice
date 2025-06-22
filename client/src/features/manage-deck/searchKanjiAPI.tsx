export async function searchKanji(kanji: string): Promise<{ kanji: string }[]> {
  const res = await fetch(`/api/search?kanji=${encodeURIComponent(kanji)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  return res.json();
}
