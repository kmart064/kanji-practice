import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type StatisticCardProps = {
  label: string;
  value: string;
  description: string;
};

export function StatisticCard({
  label,
  value,
  description,
}: StatisticCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((current) => !current)}
      className="group h-40 w-full cursor-pointer [perspective:1000px]"
      aria-label={`${label}: ${flipped ? "show value" : "show description"}`}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-3xl border border-white bg-gradient-to-br from-white to-slate-100 p-4 text-left shadow-md [backface-visibility:hidden]">
          <ArrowPathIcon className="absolute right-5 top-5 size-4 text-slate-400" />

          <p className="pr-6 text-sm text-slate-500">{label}</p>

          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-3xl border border-white bg-gradient-to-br from-slate-100 to-white p-4 text-left shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <ArrowPathIcon className="absolute right-5 top-5 size-4 text-slate-400" />

          <p className="pr-6 text-sm font-semibold text-slate-700">{label}</p>

          <p className="mt-3 text-xs leading-5 text-slate-600">{description}</p>
        </div>
      </div>
    </button>
  );
}
