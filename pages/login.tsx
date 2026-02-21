import { useRouter } from "next/router";
import { useRole } from "@/contexts/RoleContext";
import { ProviderRole, ROLE_CONFIG, SEVERITY_COLORS } from "@/utils/constants";
import { Stethoscope, UserCheck, UserCog, AlertTriangle, Monitor } from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  Stethoscope,
  UserCheck,
  UserCog,
  AlertTriangle,
};

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRole();

  const handleRoleSelect = (role: ProviderRole) => {
    setRole(role);
    router.push("/provider");
  };

  const handleMonitorStation = () => {
    setRole(null);
    router.push("/");
  };

  const roles = Object.entries(ROLE_CONFIG) as [ProviderRole, typeof ROLE_CONFIG[ProviderRole]][];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-2">Select Your Role</h1>
      <p className="text-slate-400 text-sm mb-8">Choose your provider role to see relevant alerts and actions</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-8">
        {roles.map(([key, config]) => {
          const Icon = ICONS[config.icon] || Stethoscope;
          const severity = config.severityLevels[0];
          const colors = SEVERITY_COLORS[severity];

          return (
            <button
              key={key}
              onClick={() => handleRoleSelect(key)}
              className={`flex flex-col items-start gap-3 p-5 rounded-xl bg-slate-900 border-2 border-slate-800 hover:border-slate-600 transition-all text-left group hover:bg-slate-800/50`}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <Icon size={20} className={colors.text} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-100 group-hover:text-white">
                    {config.label}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
                  {severity}
                </span>
              </div>
              <p className="text-sm text-slate-400">{config.description}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleMonitorStation}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <Monitor size={18} />
        Monitor Station (All Access)
      </button>
    </div>
  );
}
