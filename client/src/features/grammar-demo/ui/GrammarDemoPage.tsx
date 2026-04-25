import { GlassPanel } from "@/shared/ui";

export default function GrammarDemoPage() {
  return (
    <div className="py-4 lg:py-8">
      <GlassPanel className="space-y-5 rounded-[2rem] p-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Grammar Demo
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Sentence pattern practice is ready for the next step.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            This placeholder gives the new navigation a live destination for
            grammar-focused study flows. We can swap this into a full exercise
            page whenever you are ready.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Pattern recognition drills",
            "Cloze sentence reviews",
            "Quick explanation cards",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-5 text-sm text-slate-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
