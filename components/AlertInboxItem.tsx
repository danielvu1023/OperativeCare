import { useState } from "react";
import { AlertEntry } from "@/contexts/AlertContext";
import { AlertAction } from "@/contexts/AlertActionsContext";
import { VITAL_RANGES } from "@/utils/constants";
import SeverityBadge from "./SeverityBadge";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";

interface Props {
  alert: AlertEntry;
  status: "active" | "acknowledged" | "dismissed";
  action?: AlertAction;
  onAcknowledge?: () => void;
  onDismiss?: () => void;
}

export default function AlertInboxItem({ alert, status, action, onAcknowledge, onDismiss }: Props) {
  const [expanded, setExpanded] = useState(false);

  const vitalKeys = Object.keys(alert.vitalsSnapshot);

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center gap-3 p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-foreground-muted hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <SeverityBadge level={alert.severityLevel} />

        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground truncate">{alert.reason}</p>
          <p className="text-xs text-foreground-subtle mt-0.5">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </p>
        </div>

        {status === "active" && (
          <div className="flex items-center gap-2">
            {onAcknowledge && (
              <button
                onClick={onAcknowledge}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-light border border-primary text-xs font-medium text-primary hover:bg-blue-100 transition-colors"
              >
                <Check size={14} />
                Acknowledge
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs font-medium text-foreground-muted hover:bg-border transition-colors"
              >
                <X size={14} />
                Dismiss
              </button>
            )}
          </div>
        )}

        {status !== "active" && action && (
          <div className="text-xs text-foreground-subtle">
            {status === "acknowledged" ? "Acknowledged" : "Dismissed"} by {action.handledBy}
            <span className="ml-1">
              {new Date(action.timestamp).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-border">
          <p className="text-xs text-foreground-muted uppercase tracking-wider mb-2">Vitals Snapshot</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {vitalKeys.map((key) => {
              const range = VITAL_RANGES[key];
              if (!range) return null;
              return (
                <div key={key} className="text-xs bg-surface-raised rounded px-2 py-1.5">
                  <span className="text-foreground-subtle">{range.label}: </span>
                  <span className="text-foreground font-medium">
                    {alert.vitalsSnapshot[key]} {range.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
