import { AlertEntry } from "@/contexts/AlertContext";
import SeverityBadge from "./SeverityBadge";

interface Props {
  alerts: AlertEntry[];
  title?: string;
}

export default function ProviderAlertFeed({ alerts, title = "Your Alerts" }: Props) {
  if (alerts.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          {title}
        </h3>
        <p className="text-slate-500 text-sm">No alerts for your role. All clear.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {title} ({alerts.length})
      </h3>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 p-2 rounded-lg bg-slate-800/50 text-sm"
          >
            <SeverityBadge level={a.severityLevel} />
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 truncate">{a.reason}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date(a.timestamp).toLocaleTimeString()} &middot; {a.routeTo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
