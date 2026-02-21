import { AlertEntry } from "@/contexts/AlertContext";
import SeverityBadge from "./SeverityBadge";

interface Props {
  alerts: AlertEntry[];
  title?: string;
}

export default function ProviderAlertFeed({ alerts, title = "Your Alerts" }: Props) {
  if (alerts.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          {title}
        </h3>
        <p className="text-foreground-subtle text-sm">No alerts for your role. All clear.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
        {title} ({alerts.length})
      </h3>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 p-2 rounded-lg bg-surface-raised text-sm"
          >
            <SeverityBadge level={a.severityLevel} />
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate">{a.reason}</p>
              <p className="text-xs text-foreground-subtle mt-0.5">
                {new Date(a.timestamp).toLocaleTimeString()} &middot; {a.routeTo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
