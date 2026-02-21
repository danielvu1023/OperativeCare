import Link from "next/link";
import { useRole } from "@/contexts/RoleContext";
import { SEVERITY_COLORS } from "@/utils/constants";
import { Stethoscope, UserCheck, UserCog, AlertTriangle, ArrowLeftRight, Monitor } from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  Stethoscope,
  UserCheck,
  UserCog,
  AlertTriangle,
};

export default function RoleHeader() {
  const { roleConfig } = useRole();
  if (!roleConfig) return null;

  const Icon = ICONS[roleConfig.icon] || Stethoscope;
  const severity = roleConfig.severityLevels[0];
  const colors = SEVERITY_COLORS[severity];

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl bg-surface border ${colors.border}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon size={20} className={colors.text} />
        </div>
        <div>
          <p className={`font-semibold ${colors.text}`}>{roleConfig.label}</p>
          <p className="text-xs text-foreground-muted">{roleConfig.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeftRight size={14} />
          Switch Role
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
        >
          <Monitor size={14} />
          Monitor Station
        </Link>
      </div>
    </div>
  );
}
