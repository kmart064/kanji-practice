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
      value: `${statistics.reviewStreak} days`,
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
    <div className="py-4 lg:py-8">
      <GlassPanel className="space-y-6 rounded-[2rem] p-8 max-w-3xl">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 text-center">
            Statistics
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Track your Progress and Optimize your Learning
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            The following are key performance metrics that can help guide your
            study plan. Click each card for a description of the metric.
          </p>
        </div>

        <div className="mx-auto grid w-full gap-4 md:grid-cols-3">
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
      <ReadingProgressChart data={statistics.accuracyHistory} />
    </div>
  );
}
