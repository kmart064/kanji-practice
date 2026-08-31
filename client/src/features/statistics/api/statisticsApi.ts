import { apiFetch } from "@/shared/api";

export interface AccuracyHistory {
  date: string;
  accuracy: number;
}

export interface Statistics {
  reviewStreak: number;
  newWordCount: number;
  averageAccuracy: number;
  accuracyHistory: AccuracyHistory[];
}

export async function getStatistics(): Promise<Statistics> {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return await apiFetch(`/api/stats?timeZone=${encodeURIComponent(timeZone)}`);
}
