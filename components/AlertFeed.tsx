import { useAlerts, AlertEntry } from "../contexts/AlertContext";
import SeverityBadge from "./SeverityBadge";

export default function AlertFeed() {
  const { alerts } = useAlerts();
  const recent = alerts.slice(0, 20);

  if (recent.length === 0) {
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
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {recent.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 p-2 rounded-lg bg-surface-raised text-sm"
          >
            <SeverityBadge level={a.severityLevel} />
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate">{a.reason}</p>
              <p className="text-xs text-foreground-subtle mt-0.5">
                {new Date(a.timestamp).toLocaleTimeString()} &middot;{" "}
                {a.routeTo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
