import { useEffect, useState } from "react";
import { getStatistics, Statistics } from "../api/statisticsApi";
import { GlassPanel } from "@/shared/ui";
import { StatisticCard } from "./StatisticCard";
import ReadingProgressChart from "./ReadingProgressChart";

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    async function loadStatistics() {
      const data = await getStatistics();
      setStatistics(data);
    }

    loadStatistics();
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      label: "Review Streak",
      value: `${statistics.reviewStreak} ${
        statistics.reviewStreak === 1 ? "day" : "days"
      }`,
      description:
        "The number of consecutive days on which you completed a review session.",
    },
    {
      label: "New Word Rate",
      value: `${statistics.newWordCount}`,
      description:
        "The number of new words added to your study material for the last two weeks.",
    },
    {
      label: "Average Accuracy",
      value: `${statistics.averageAccuracy}%`,
      description:
        "The percentage of reviewed words that you answered correctly on average for the past two weeks.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full max-w-2xl">
        <GlassPanel>
          <div className="space-y-2">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Statistics
            </p>

            <h1 className="text-center text-3xl font-semibold text-slate-900">
              Track Your Progress and Optimize Your Pace
            </h1>

            <p className="text-sm leading-6 text-slate-600">
              This page demonstrates how study statistics can be used as a
              feedback loop to tailor your study pace. The following metrics are
              based on my own study data and illustrate how performance can
              inform decisions about when to introduce new kanji and how quickly
              to progress. Click each card to learn more about the metric.
            </p>
          </div>

          <div className="mt-2 mx-auto grid w-full gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <StatisticCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="w-full max-w-2xl">
        <ReadingProgressChart
          data={statistics.accuracyHistory}
          averageAccuracy={statistics.averageAccuracy}
        />
      </div>
    </div>
  );
}
