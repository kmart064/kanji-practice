import type { Statistics } from "../api/statisticsApi";

export const demoStatistics: Statistics = {
  reviewStreak: 14,
  newWordCount: 24,
  averageAccuracy: 83,
  accuracyHistory: [
    { date: "2026-08-21", accuracy: 65 },
    { date: "2026-08-22", accuracy: 73 },
    { date: "2026-08-23", accuracy: 79 },
    { date: "2026-08-24", accuracy: 84 },
    { date: "2026-08-25", accuracy: 88 },
    { date: "2026-08-26", accuracy: 95 },
    { date: "2026-08-27", accuracy: 75 },
    { date: "2026-08-28", accuracy: 81 },
    { date: "2026-08-29", accuracy: 87 },
    { date: "2026-08-30", accuracy: 79 },
    { date: "2026-08-31", accuracy: 84 },
    { date: "2026-09-01", accuracy: 86 },
    { date: "2026-09-02", accuracy: 80 },
    { date: "2026-09-03", accuracy: 83 },
  ],
};
