export async function deleteKanji(
  kanjiArray: string[]
): Promise<{ message: string }> {
  const res = await fetch("/api/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kanji: kanjiArray }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // already reads the stream
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  return res.json();
}
