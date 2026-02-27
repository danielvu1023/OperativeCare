import { useAlerts } from "../contexts/AlertContext";
import { SeverityLevel } from "../utils/constants";
import SeverityBadge from "./SeverityBadge";

const SEVERITY_PRIORITY: Record<SeverityLevel, number> = {
  critical: 0,
  urgent: 1,
  warning: 2,
  normal: 3,
};


const LEFT_BORDER: Record<SeverityLevel, string> = {
  normal: "border-l-green-500",
  warning: "border-l-amber-500",
  urgent: "border-l-orange-500",
  critical: "border-l-red-500",
};

const ROW_BG: Record<SeverityLevel, string> = {
  normal: "bg-surface-raised",
  warning: "bg-amber-50",
  urgent: "bg-orange-50",
  critical: "bg-red-50",
};

function relativeTime(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

export default function AlertFeed() {
  const { alerts } = useAlerts();
  console.log("testing");
  const sorted = [...alerts]
    .sort((a, b) => {
      const pd = SEVERITY_PRIORITY[a.severityLevel] - SEVERITY_PRIORITY[b.severityLevel];
      if (pd !== 0) return pd;
      return b.timestamp - a.timestamp;
    })
    .slice(0, 20);

  if (sorted.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Recent Alerts
        </h3>
        <p className="text-foreground-subtle text-sm">No alerts yet. Monitoring...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
        Recent Alerts
      </h3>
      <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
        {sorted.map((a) => (
          <div
            key={a.id}
            className={`flex items-start gap-3 p-2 rounded-lg border-l-4 text-sm ${LEFT_BORDER[a.severityLevel]} ${ROW_BG[a.severityLevel]}`}
          >
            <SeverityBadge level={a.severityLevel} />
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate">{a.reason}</p>
              <p className="text-xs text-foreground-subtle mt-0.5">
                {relativeTime(a.timestamp)} &middot; {a.routeTo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
