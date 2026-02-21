import { useState } from "react";
import { useAlerts } from "../contexts/AlertContext";
import { SeverityLevel } from "../utils/constants";
import SeverityBadge from "./SeverityBadge";
import { Trash2 } from "lucide-react";

const LEVELS: SeverityLevel[] = ["critical", "urgent", "warning", "normal"];

export default function AlertHistoryTable() {
  const { alerts, clearAlerts } = useAlerts();
  const [filter, setFilter] = useState<SeverityLevel | "all">("all");
  const [sortNewest, setSortNewest] = useState(true);

  let filtered = filter === "all" ? alerts : alerts.filter((a) => a.severityLevel === filter);
  if (!sortNewest) filtered = [...filtered].reverse();

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-foreground">Alert History</h2>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as SeverityLevel | "all")}
            className="bg-surface-raised border border-border text-sm rounded-lg px-3 py-1.5 text-foreground"
          >
            <option value="all">All Severities</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSortNewest((s) => !s)}
            className="bg-surface-raised border border-border text-sm rounded-lg px-3 py-1.5 text-foreground hover:bg-border transition-colors"
          >
            {sortNewest ? "Newest First" : "Oldest First"}
          </button>
          <button
            onClick={clearAlerts}
            className="bg-surface-raised border border-border text-sm rounded-lg px-3 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-1 transition-colors"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-foreground-subtle text-sm py-8 text-center">No alerts to display.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-foreground-subtle uppercase tracking-wider border-b border-border">
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2 pr-4">Severity</th>
                <th className="pb-2 pr-4">Route To</th>
                <th className="pb-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border hover:bg-surface-raised">
                  <td className="py-2 pr-4 text-foreground-muted whitespace-nowrap">
                    {new Date(a.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2 pr-4">
                    <SeverityBadge level={a.severityLevel} />
                  </td>
                  <td className="py-2 pr-4 text-foreground">{a.routeTo}</td>
                  <td className="py-2 text-foreground">{a.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-foreground-subtle mt-3">
        Showing {filtered.length} of {alerts.length} total alerts
      </p>
    </div>
  );
}
