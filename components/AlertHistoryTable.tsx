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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">Alert History</h2>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as SeverityLevel | "all")}
            className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1.5 text-slate-300"
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
            className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1.5 text-slate-300 hover:bg-slate-700"
          >
            {sortNewest ? "Newest First" : "Oldest First"}
          </button>
          <button
            onClick={clearAlerts}
            className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1.5 text-red-400 hover:bg-red-900/30 flex items-center gap-1"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm py-8 text-center">No alerts to display.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2 pr-4">Severity</th>
                <th className="pb-2 pr-4">Route To</th>
                <th className="pb-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-2 pr-4 text-slate-400 whitespace-nowrap">
                    {new Date(a.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2 pr-4">
                    <SeverityBadge level={a.severityLevel} />
                  </td>
                  <td className="py-2 pr-4 text-slate-300">{a.routeTo}</td>
                  <td className="py-2 text-slate-300">{a.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-600 mt-3">
        Showing {filtered.length} of {alerts.length} total alerts
      </p>
    </div>
  );
}
