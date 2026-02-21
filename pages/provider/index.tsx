import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRole } from "@/contexts/RoleContext";
import { useVitals } from "@/contexts/VitalsContext";
import { useAlerts } from "@/contexts/AlertContext";
import { evaluateVitals } from "@/utils/triageEngine";
import PatientHeader from "@/components/PatientHeader";
import SimulationControls from "@/components/SimulationControls";
import VitalsMonitor from "@/components/VitalsMonitor";
import TriagePanel from "@/components/TriagePanel";
import ProviderAlertFeed from "@/components/ProviderAlertFeed";
import RoleHeader from "@/components/RoleHeader";

export default function ProviderDashboard() {
  const router = useRouter();
  const { role, roleConfig } = useRole();
  const { current, history, playing, scenario, togglePlay, reset, triggerCritical } = useVitals();
  const { alerts } = useAlerts();

  useEffect(() => {
    if (role === null) {
      router.replace("/login");
    }
  }, [role, router]);

  if (!role || !roleConfig) return null;

  const triage = evaluateVitals(current);
  const triageMatchesRole = roleConfig.matchesRouteTo.includes(triage.routeTo);

  const filteredAlerts = alerts.filter((a) =>
    roleConfig.matchesRouteTo.includes(a.routeTo)
  );

  return (
    <div className="space-y-4">
      <RoleHeader />
      <PatientHeader />
      <SimulationControls
        playing={playing}
        scenario={scenario}
        onTogglePlay={togglePlay}
        onReset={reset}
        onTriggerCritical={triggerCritical}
      />
      <VitalsMonitor current={current} history={history} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {triageMatchesRole ? (
          <TriagePanel triage={triage} />
        ) : (
          <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-center">
            <div className="text-center">
              <p className="text-foreground-muted text-sm font-medium">No action required</p>
              <p className="text-foreground-subtle text-xs mt-1">
                Current triage is routed to {triage.routeTo}
              </p>
            </div>
          </div>
        )}
        <ProviderAlertFeed alerts={filteredAlerts} />
      </div>
    </div>
  );
}
