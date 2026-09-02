import { getAccuracyHistory } from "./getAccuracyHistory.js";
import { getAverageAccuracy } from "./getAverageAccuracy.js";
import { getNewWordCount } from "./getNewWordCount.js";
import { getReviewStreak } from "./getReviewStreak.js";

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
