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

const STATUS_STYLES = {
  normal: { border: "border-emerald-500/40", color: "text-emerald-400", line: "#34d399" },
  warning: { border: "border-yellow-500/60", color: "text-yellow-400", line: "#facc15" },
  critical: { border: "border-red-500/80", color: "text-red-400", line: "#f87171" },
};

export default function VitalCard({ vitalKey, value, history }: VitalCardProps) {
  const range = VITAL_RANGES[vitalKey];
  const status = getStatus(value, range);
  const styles = STATUS_STYLES[status];

  const chartData = useMemo(
    () => history.map((h) => ({ v: h[vitalKey as keyof VitalsSnapshot] as number })),
    [history, vitalKey]
  );

  return (
    <div
      className={`bg-slate-900 border-2 ${styles.border} rounded-xl p-4 flex flex-col gap-2 transition-all duration-300`}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {range.label}
        </span>
        <span className="text-xs text-slate-500">
          {range.warningLow}–{range.warningHigh} {range.unit}
        </span>
      </div>
      <div className={`text-3xl font-bold tabular-nums ${styles.color} transition-colors duration-300`}>
        {value}
        <span className="text-sm font-normal text-slate-500 ml-1">{range.unit}</span>
      </div>
      {chartData.length > 1 && (
        <div className="h-12 mt-1">
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
  );
}
