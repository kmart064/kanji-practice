import { GlassPanel } from "@/shared/ui";

export interface KanjiWatchListItem {
  id: string;
  kanji: string;
  word: string;
  meaning: string;
  retentionRate: number;
  lastReviewed: string;
  reviewCount: number;
}

interface KanjiWatchlistProps {
  data: KanjiWatchListItem[];
}

const RETENTION_CRITICAL_THRESHOLD = 50;
const RETENTION_WARNING_THRESHOLD = 70;

export default function KanjiWatchlist({ data }: KanjiWatchlistProps) {
  return (
    <GlassPanel>
      <div className="space-y-2">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Kanji Watchlist
        </p>

        <h2 className="text-center text-2xl font-semibold text-slate-900">
          Kanji That Need More Attention
        </h2>

        <p className="text-sm leading-6 text-slate-600">
          Historical accuracy records are analyzed to identify problematic kanji
          based on long-term retention. This sample data highlights kanji that
          have repeatedly shown difficulty being retained over time and may
          benefit from additional review.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Kanji</th>
              <th className="px-4 py-3">Word</th>
              <th className="px-4 py-3">Retention</th>
              <th className="hidden px-4 py-3 sm:table-cell">Last Reviewed</th>
              <th className="hidden px-4 py-3 md:table-cell">Reviews</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {data.map((item) => (
              <tr
                key={item.id}
                className="text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <span className="text-xl font-semibold text-slate-900">
                    {item.kanji}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{item.word}</div>
                  <div className="text-xs text-slate-500">{item.meaning}</div>
                </td>

                <td className="px-4 py-3">
                  <RetentionRate value={item.retentionRate} />
                </td>

                <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                  {item.lastReviewed}
                </td>

                <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                  {item.reviewCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}

function RetentionRate({ value }: { value: number }) {
  return (
    <span
      className={`font-semibold ${
        value < RETENTION_CRITICAL_THRESHOLD
          ? "text-red-600"
          : value < RETENTION_WARNING_THRESHOLD
            ? "text-amber-600"
            : "text-green-600"
      }`}
    >
      {value}%
    </span>
  );
}
