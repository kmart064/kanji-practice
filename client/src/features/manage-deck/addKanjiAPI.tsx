export async function addKanji(
  kanjiArray: string[]
): Promise<{ message: string; inserted: string; duplicates: string }> {
  const res = await fetch("/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kanji: kanjiArray }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // already reads the stream
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  return res.json();
}
