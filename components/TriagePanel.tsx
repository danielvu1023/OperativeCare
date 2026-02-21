import { TriageResult } from "../utils/triageEngine";
import { SEVERITY_COLORS } from "../utils/constants";
import SeverityBadge from "./SeverityBadge";
import { Stethoscope, UserCheck, UserCog, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const ICONS: Record<string, React.ElementType> = {
  Stethoscope,
  UserCheck,
  UserCog,
  AlertTriangle,
};

interface Props {
  triage: TriageResult;
}

export default function TriagePanel({ triage }: Props) {
  const c = SEVERITY_COLORS[triage.severityLevel];
  const Icon = ICONS[triage.routeIcon] || Stethoscope;
  const [flash, setFlash] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    setTimeStr(new Date().toLocaleTimeString());
  }, [triage]);

  useEffect(() => {
    if (triage.severityLevel !== "normal") {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [triage.severityLevel, triage.reason]);

  return (
    <div
      className={`bg-surface border-2 ${c.border} rounded-xl p-5 transition-all duration-500 ${c.glow} ${
        flash ? "animate-pulse" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">
          Triage Status
        </h3>
        <SeverityBadge level={triage.severityLevel} />
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon size={20} className={c.text} />
        </div>
        <div>
          <p className="text-sm text-foreground-muted">Route to</p>
          <p className={`font-semibold ${c.text}`}>{triage.routeTo}</p>
        </div>
      </div>

      <p className="text-sm text-foreground leading-relaxed">{triage.reason}</p>
      <p className="text-xs text-foreground-subtle mt-2">
        {timeStr}
      </p>
    </div>
  );
}
