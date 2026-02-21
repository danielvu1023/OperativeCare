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
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50">
      <div className="flex items-center gap-3 p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <SeverityBadge level={alert.severityLevel} />

        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-300 truncate">{alert.reason}</p>
          <p className="text-xs text-slate-500 mt-0.5">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </p>
        </div>

        {status === "active" && (
          <div className="flex items-center gap-2">
            {onAcknowledge && (
              <button
                onClick={onAcknowledge}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-700 text-xs font-medium text-cyan-300 hover:bg-cyan-900/50 transition-colors"
              >
                <Check size={14} />
                Acknowledge
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-slate-600 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <X size={14} />
                Dismiss
              </button>
            )}
          </div>
        )}

        {status !== "active" && action && (
          <div className="text-xs text-slate-500">
            {status === "acknowledged" ? "Acknowledged" : "Dismissed"} by {action.handledBy}
            <span className="ml-1">
              {new Date(action.timestamp).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Vitals Snapshot</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {vitalKeys.map((key) => {
              const range = VITAL_RANGES[key];
              if (!range) return null;
              return (
                <div key={key} className="text-xs bg-slate-900/50 rounded px-2 py-1.5">
                  <span className="text-slate-500">{range.label}: </span>
                  <span className="text-slate-200 font-medium">
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
