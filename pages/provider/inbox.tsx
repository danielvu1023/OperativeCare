import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useRole } from "@/contexts/RoleContext";
import { useAlerts } from "@/contexts/AlertContext";
import { useAlertActions } from "@/contexts/AlertActionsContext";
import RoleHeader from "@/components/RoleHeader";
import AlertInboxItem from "@/components/AlertInboxItem";

export default function ProviderInbox() {
  const router = useRouter();
  const { role, roleConfig } = useRole();
  const { alerts } = useAlerts();
  const { actions, acknowledgeAlert, dismissAlert, getAlertStatus } = useAlertActions();

  useEffect(() => {
    if (role === null) {
      router.replace("/login");
    }
  }, [role, router]);

  const filteredAlerts = useMemo(() => {
    if (!roleConfig) return [];
    return alerts.filter((a) => roleConfig.matchesRouteTo.includes(a.routeTo));
  }, [alerts, roleConfig]);

  const { active, acknowledged, dismissed } = useMemo(() => {
    const active = filteredAlerts.filter((a) => getAlertStatus(a.id) === "active");
    const acknowledged = filteredAlerts.filter((a) => getAlertStatus(a.id) === "acknowledged");
    const dismissed = filteredAlerts.filter((a) => getAlertStatus(a.id) === "dismissed");
    return { active, acknowledged, dismissed };
  }, [filteredAlerts, getAlertStatus]);

  if (!role || !roleConfig) return null;

  return (
    <div className="space-y-4">
      <RoleHeader />

      <div className="space-y-6">
        {/* Active */}
        <section>
          <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            Active
            {active.length > 0 && (
              <span className="bg-red-50 text-red-700 border border-red-600 text-xs px-2 py-0.5 rounded-full">
                {active.length}
              </span>
            )}
          </h2>
          {active.length === 0 ? (
            <p className="text-foreground-subtle text-sm bg-surface border border-border rounded-xl p-4">
              No active alerts. All clear.
            </p>
          ) : (
            <div className="space-y-2">
              {active.map((a) => (
                <AlertInboxItem
                  key={a.id}
                  alert={a}
                  status="active"
                  onAcknowledge={() => acknowledgeAlert(a.id)}
                  onDismiss={() => dismissAlert(a.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Acknowledged */}
        <section>
          <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            Acknowledged
            {acknowledged.length > 0 && (
              <span className="bg-primary-light text-primary border border-primary text-xs px-2 py-0.5 rounded-full">
                {acknowledged.length}
              </span>
            )}
          </h2>
          {acknowledged.length === 0 ? (
            <p className="text-foreground-subtle text-sm bg-surface border border-border rounded-xl p-4">
              No acknowledged alerts.
            </p>
          ) : (
            <div className="space-y-2">
              {acknowledged.map((a) => (
                <AlertInboxItem
                  key={a.id}
                  alert={a}
                  status="acknowledged"
                  action={actions[a.id]}
                />
              ))}
            </div>
          )}
        </section>

        {/* Dismissed */}
        <section>
          <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            Dismissed
            {dismissed.length > 0 && (
              <span className="bg-surface-raised text-foreground-muted border border-border-strong text-xs px-2 py-0.5 rounded-full">
                {dismissed.length}
              </span>
            )}
          </h2>
          {dismissed.length === 0 ? (
            <p className="text-foreground-subtle text-sm bg-surface border border-border rounded-xl p-4">
              No dismissed alerts.
            </p>
          ) : (
            <div className="space-y-2">
              {dismissed.map((a) => (
                <AlertInboxItem
                  key={a.id}
                  alert={a}
                  status="dismissed"
                  action={actions[a.id]}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
