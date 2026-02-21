import React, { createContext, useContext, useState, useCallback } from "react";
import { SeverityLevel } from "../utils/constants";

export interface AlertEntry {
  id: string;
  timestamp: number;
  severityLevel: SeverityLevel;
  routeTo: string;
  reason: string;
  vitalsSnapshot: Record<string, number>;
}

interface AlertContextValue {
  alerts: AlertEntry[];
  addAlert: (alert: Omit<AlertEntry, "id">) => void;
  clearAlerts: () => void;
}

const AlertContext = createContext<AlertContextValue>({
  alerts: [],
  addAlert: () => {},
  clearAlerts: () => {},
});

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertEntry[]>([]);

  const addAlert = useCallback((alert: Omit<AlertEntry, "id">) => {
    setAlerts((prev) => {
      const entry: AlertEntry = {
        ...alert,
        id: `alert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      };
      return [entry, ...prev].slice(0, 100);
    });
  }, []);

  const clearAlerts = useCallback(() => setAlerts([]), []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  return useContext(AlertContext);
}
