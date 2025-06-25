import { apiFetch } from "../../utils/apiFetch";

export async function startStudying(): Promise<{
  sessionId: number;
  message: string;
  wordList: string;
}> {
  return await apiFetch("/review/start", {
    method: "POST",
  });
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
  return await apiFetch(`review/${sessionId}/review-update`, {
    method: "POST",
    body: JSON.stringify({ incorrectKanji }),
  });
}
