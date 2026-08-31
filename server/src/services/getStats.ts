import { getAccuracyHistory } from "./getAccuracyHistory";
import { getAverageAccuracy } from "./getAverageAccuracy";
import { getNewWordCount } from "./getNewWordCount";
import { getReviewStreak } from "./getReviewStreak";

export async function getStats(timeZone: string) {
  const [newWordCount, reviewStreak, averageAccuracy, accuracyHistory] =
    await Promise.all([
      getNewWordCount(),
      getReviewStreak(),
      getAverageAccuracy(),
      getAccuracyHistory(timeZone),
    ]);

  return {
    newWordCount,
    reviewStreak,
    averageAccuracy,
    accuracyHistory,
  };
}
