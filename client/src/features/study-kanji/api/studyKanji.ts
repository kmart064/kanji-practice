import { apiFetch } from "@/shared/api";

export async function startStudying(): Promise<{
  sessionId: number;
  message: string;
  wordList: string;
}> {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return await apiFetch("/review/start", {
    method: "POST",
    body: JSON.stringify({ timeZone }),
  });
}

export async function updateStudySession(
  sessionId: number,
  incorrectKanji: string[],
): Promise<{
  status: string;
  message: string;
  wordList: string;
  note: string;
  response: string;
}> {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return await apiFetch(`/review/${sessionId}/review-update`, {
    method: "POST",
    body: JSON.stringify({
      incorrectKanji,
      timeZone,
    }),
  });
}
