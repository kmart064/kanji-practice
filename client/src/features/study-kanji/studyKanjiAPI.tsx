export async function startStudying(): Promise<{
  sessionId: number;
  message: string;
  wordList: string;
}> {
  const res = await fetch("/review/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  return res.json();
}

export async function updateStudySession(
  sessionId: number,
  incorrectKanji: string[]
): Promise<{
  status: string;
  message: string;
  wordList: string;
  note: string;
  response: string;
}> {
  const res = await fetch("/review/" + sessionId + "/review-update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ incorrectKanji }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  return res.json();
}
