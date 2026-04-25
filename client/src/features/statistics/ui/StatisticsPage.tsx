import { GlassPanel } from "@/shared/ui";

const stats = [
  { label: "Review Streak", value: "12 days" },
  { label: "Reading Sessions", value: "8 demos" },
  { label: "Accuracy Trend", value: "+14%" },
];

export default function StatisticsPage() {
  return (
    <div className="py-4 lg:py-8">
      <GlassPanel className="space-y-6 rounded-[2rem] p-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Statistics
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Track momentum across your study sessions.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            These summary cards are placeholders for your real learning
            analytics and give the sidebar a proper statistics destination.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-slate-100/70 p-5 shadow-md"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
