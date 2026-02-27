import { VitalRange, VITAL_RANGES } from "../utils/constants";
import { VitalsSnapshot } from "../utils/vitalsGenerator";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { useMemo } from "react";

interface VitalCardProps {
  vitalKey: keyof typeof VITAL_RANGES;
  value: number;
  history: VitalsSnapshot[];
}

function getStatus(value: number, range: VitalRange) {
  if (value <= range.criticalLow || value >= range.criticalHigh) return "critical";
  if (value <= range.warningLow || value >= range.warningHigh) return "warning";
  return "normal";
}

function getTrend(history: VitalsSnapshot[], key: string): "up" | "down" | "flat" {
  if (history.length < 4) return "flat";
  const vals = history.slice(-6).map((h) => h[key as keyof VitalsSnapshot] as number);
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const first = avg(vals.slice(0, 3));
  const last = avg(vals.slice(-3));
  const threshold = first * 0.025;
  if (last - first > threshold) return "up";
  if (first - last > threshold) return "down";
  return "flat";
}

function TrendArrow({ trend, colorClass }: { trend: "up" | "down" | "flat"; colorClass: string }) {
  if (trend === "flat") return <span className={`text-sm ${colorClass} opacity-40`}>→</span>;
  if (trend === "up") return <span className={`text-sm font-bold ${colorClass}`}>↑</span>;
  return <span className={`text-sm font-bold ${colorClass}`}>↓</span>;
}

const STATUS_STYLES = {
  normal: {
    border: "border-green-400/50",
    color: "text-green-700",
    line: "#15803d",
    bg: "bg-surface",
    accent: "bg-green-500",
    shadow: "",
  },
  warning: {
    border: "border-amber-400/70",
    color: "text-amber-700",
    line: "#b45309",
    bg: "bg-amber-50",
    accent: "bg-amber-500",
    shadow: "shadow-sm",
  },
  critical: {
    border: "border-red-500",
    color: "text-red-700",
    line: "#b91c1c",
    bg: "bg-red-50",
    accent: "bg-red-500",
    shadow: "shadow-md",
  },
};

export default function VitalCard({ vitalKey, value, history }: VitalCardProps) {
  const range = VITAL_RANGES[vitalKey];
  const status = getStatus(value, range);
  const styles = STATUS_STYLES[status];
  const trend = getTrend(history, vitalKey as string);

  const chartData = useMemo(
    () => history.map((h) => ({ v: h[vitalKey as keyof VitalsSnapshot] as number })),
    [history, vitalKey]
  );

  return (
    <div
      className={`relative overflow-hidden ${styles.bg} ${styles.shadow} border-2 ${styles.border} rounded-xl transition-all duration-300`}
    >
      {/* Left accent bar */}
      <div className={`absolute inset-y-0 left-0 w-1.5 ${styles.accent}`} />

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
            {range.label}
          </span>
          <div className="flex items-center gap-1.5">
            <TrendArrow trend={trend} colorClass={styles.color} />
            <span className="text-xs text-foreground-subtle">
              {range.warningLow}–{range.warningHigh}
            </span>
          </div>
        </div>

        <div className={`text-3xl font-bold tabular-nums ${styles.color} transition-colors duration-300`}>
          {value}
          <span className="text-sm font-normal text-foreground-subtle ml-1">{range.unit}</span>
        </div>

        {chartData.length > 1 && (
          <div className="h-16 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <YAxis domain={["dataMin - 2", "dataMax + 2"]} hide />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={styles.line}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
