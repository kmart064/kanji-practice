import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { AccuracyHistory } from "../api/statisticsApi";

interface ReadingProgressChartProps {
  data: AccuracyHistory[];
  averageAccuracy: number;
}

export default function ReadingProgressChart({
  data,
  averageAccuracy,
}: ReadingProgressChartProps) {
  return (
    <div className="panel-surface p-6">
      <p className="mb-6 text-sm text-slate-600">
        <h2 className="mb-2 text-xl font-semibold">
          My accuracy across sessions
        </h2>

        <p className="mb-6 text-sm text-slate-600">
          My study data demonstrating how statistics can be used to guide my
          personal learning pace. The target range represents the accuracy I aim
          for to balance strong retention with an efficient rate of learning new
          words. If my average accuracy falls below the target range, I'm likely
          introducing new words too quickly and should reduce my word rate to
          improve retention. Conversely, if my average accuracy exceeds the
          target range, I may be able to increase my word rate and challenge
          myself more while maintaining strong retention.
        </p>
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-blue-500" />
          <span>Accuracy</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-6 border border-red-500 bg-red-200/50" />
          <span>Target range</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 border-t-2 border-dashed border-green-500" />
          <span>Average accuracy</span>
        </div>
      </div>

      <ResponsiveContainer max-w-4xl height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis domain={[60, 100]} tickFormatter={(value) => `${value}%`} />

          <Tooltip formatter={(value) => `${value}%`} />

          <ReferenceArea y1={80} y2={90} fill="#fecaca" fillOpacity={0.35} />

          <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="4 4" />

          <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="4 4" />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

          <ReferenceLine
            y={averageAccuracy}
            stroke="#10b981"
            strokeWidth={2}
            label={{
              value: `Average: ${averageAccuracy}%`,
              position: "right",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
