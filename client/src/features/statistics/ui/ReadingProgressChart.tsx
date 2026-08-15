import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface ReadingProgressPoint {
  date: string;
  accuracy: number;
}

interface ReadingProgressChartProps {
  data: ReadingProgressPoint[];
}

export default function ReadingProgressChart({
  data,
}: ReadingProgressChartProps) {
  return (
    <div className="panel-surface p-6">
      <h2 className="mb-2 text-xl font-semibold">
        Sample accuracy across sessions
      </h2>

      <p className="mb-6 text-sm text-slate-600">
        Illustrative data showing the accuracy tracking across study sessions.
        Ideally, you want to strike a good balance between challenging yourself,
        but also not going too fast. The red dotted line represents this ideal
        balance. Being significantly above the line means you should challenge
        yourself more by increasing the rate of new words to your daily/weekly
        schedule, while being significantly below means you should reduce the
        rate. Your personal ideal rate will become apparent at a certain point,
        and can be utilized to maximize your learning efficiency.
      </p>

      <ResponsiveContainer max-w-4xl height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis domain={[60, 100]} tickFormatter={(value) => `${value}%`} />

          <Tooltip formatter={(value) => `${value}%`} />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

          <ReferenceLine
            y={90}
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="4 4"
            label={{ value: "Goal", position: "right" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
