import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import type { TriageResult } from "@/utils/triageEngine";
import type { SeverityLevel } from "@/utils/constants";

const CONFIG: Record<SeverityLevel, {
  wrapper: string;
  text: string;
  dot: string;
  icon: typeof CheckCircle2;
  label: string;
  pulse: boolean;
}> = {
  normal: {
    wrapper: "bg-green-50 border border-green-200",
    text: "text-green-800",
    dot: "bg-green-500",
    icon: CheckCircle2,
    label: "All Vitals Normal",
    pulse: false,
  },
  warning: {
    wrapper: "bg-amber-50 border border-amber-300",
    text: "text-amber-900",
    dot: "bg-amber-500",
    icon: AlertTriangle,
    label: "Warning",
    pulse: false,
  },
  urgent: {
    wrapper: "bg-orange-100 border border-orange-400",
    text: "text-orange-900",
    dot: "bg-orange-600",
    icon: AlertTriangle,
    label: "Urgent",
    pulse: true,
  },
  critical: {
    wrapper: "bg-red-600 border border-red-700",
    text: "text-white",
    dot: "bg-white",
    icon: AlertCircle,
    label: "CRITICAL",
    pulse: true,
  },
};

interface Props {
  triage: TriageResult;
}

export default function StatusBar({ triage }: Props) {
  const cfg = CONFIG[triage.severityLevel];
  const Icon = cfg.icon;

  return (
    <div
      className={`rounded-xl px-4 py-2.5 flex items-center gap-3 transition-colors duration-500 ${cfg.wrapper}`}
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`w-2 h-2 rounded-full block flex-shrink-0 ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`}
        />
        <Icon size={16} className={cfg.text} />
      </div>

      <span className={`font-bold text-sm tracking-wide flex-shrink-0 ${cfg.text}`}>
        {cfg.label}
      </span>

      <span className={`text-sm flex-1 truncate ${cfg.text} opacity-80`}>
        — {triage.reason}
      </span>

      <span className={`text-xs font-medium flex-shrink-0 ${cfg.text} opacity-70`}>
        Route → {triage.routeTo}
      </span>
    </div>
  );
}
