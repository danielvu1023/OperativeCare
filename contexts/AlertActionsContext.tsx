import React, { createContext, useContext, useState, useCallback } from "react";
import { ProviderRole } from "@/utils/constants";
import { useRole } from "./RoleContext";

export interface AlertAction {
  alertId: string;
  action: "acknowledged" | "dismissed";
  timestamp: number;
  handledBy: string;
  handledByRole: ProviderRole;
}

interface AlertActionsContextValue {
  actions: Record<string, AlertAction>;
  acknowledgeAlert: (alertId: string) => void;
  dismissAlert: (alertId: string) => void;
  getAlertStatus: (alertId: string) => "active" | "acknowledged" | "dismissed";
}

const AlertActionsContext = createContext<AlertActionsContextValue>({
  actions: {},
  acknowledgeAlert: () => {},
  dismissAlert: () => {},
  getAlertStatus: () => "active",
});

export function AlertActionsProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useState<Record<string, AlertAction>>({});
  const { role, roleConfig } = useRole();

  const acknowledgeAlert = useCallback((alertId: string) => {
    if (!role || !roleConfig) return;
    setActions((prev) => ({
      ...prev,
      [alertId]: {
        alertId,
        action: "acknowledged",
        timestamp: Date.now(),
        handledBy: roleConfig.label,
        handledByRole: role,
      },
    }));
  }, [role, roleConfig]);

  const dismissAlert = useCallback((alertId: string) => {
    if (!role || !roleConfig) return;
    setActions((prev) => ({
      ...prev,
      [alertId]: {
        alertId,
        action: "dismissed",
        timestamp: Date.now(),
        handledBy: roleConfig.label,
        handledByRole: role,
      },
    }));
  }, [role, roleConfig]);

  const getAlertStatus = useCallback((alertId: string): "active" | "acknowledged" | "dismissed" => {
    const action = actions[alertId];
    if (!action) return "active";
    return action.action;
  }, [actions]);

  return (
    <AlertActionsContext.Provider value={{ actions, acknowledgeAlert, dismissAlert, getAlertStatus }}>
      {children}
    </AlertActionsContext.Provider>
  );
}

export function useAlertActions() {
  return useContext(AlertActionsContext);
}
