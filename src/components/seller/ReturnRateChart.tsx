"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Dec", you: 31, median: 27 },
  { month: "Jan", you: 33, median: 27 },
  { month: "Feb", you: 36, median: 28 },
  { month: "Mar", you: 35, median: 28 },
  { month: "Apr", you: 36, median: 29 },
  { month: "May", you: 34, median: 28 },
];

export function ReturnRateChart() {
  return (
    <div className="bg-white border border-[#E0DDD8] rounded-sm p-7">
      <h3 className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#1C1C1C] mb-6">
        Return Rate Trend — Last 6 Months
      </h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#E0DDD8" vertical={false} />
            <XAxis dataKey="month" stroke="#6B6B6B" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6B6B6B" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} unit="%" domain={[20, 40]} />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #E0DDD8", borderRadius: 2, fontSize: 12 }}
              formatter={(v) => [`${v}%`]}
            />
            <Legend verticalAlign="bottom" iconType="plainline" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Line type="monotone" dataKey="you" name="Your Rate" stroke="#CC1818" strokeWidth={2.5} dot={{ r: 3, fill: "#CC1818" }} />
            <Line type="monotone" dataKey="median" name="Category Median" stroke="#6B6B6B" strokeWidth={2} strokeDasharray="5 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
