"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function generateData(year: number) {
  const seed = year * 7;
  return months.map((month, i) => {
    const base = ((seed + i * 13) % 40) + 30;
    const low = base;
    const medium = ((seed + i * 7) % 25) + 10;
    const high = 100 - low - medium;
    return {
      month,
      low: Math.max(low, 0),
      medium: Math.max(medium, 0),
      high: Math.max(Math.min(high, 30), 2),
    };
  });
}

const yearOptions = [2024, 2025, 2026] as const;

export function DelayChart() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const data = generateData(selectedYear);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Delay Statistics</h3>
        <div className="flex gap-1">
          {yearOptions.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "default" : "outline"}
              size="xs"
              className={cn(
                selectedYear === year && "bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
              )}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="%" />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                fontSize: 12,
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="low"
              name="Low delays"
              stackId="a"
              fill="#00BCD4"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="medium"
              name="Medium delays"
              stackId="a"
              fill="#FF9800"
            />
            <Bar
              dataKey="high"
              name="High delays"
              stackId="a"
              fill="#F44336"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
