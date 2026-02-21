import React, { createContext, useContext } from "react";
import { useVitalsSimulator } from "@/hooks/useVitalsSimulator";
import { VitalsSnapshot, ScenarioType } from "@/utils/vitalsGenerator";

interface VitalsContextValue {
  current: VitalsSnapshot;
  history: VitalsSnapshot[];
  playing: boolean;
  scenario: ScenarioType;
  togglePlay: () => void;
  reset: () => void;
  triggerCritical: () => void;
}

const INITIAL: VitalsSnapshot = {
  heartRate: 72,
  systolicBP: 120,
  diastolicBP: 76,
  spO2: 97,
  temperature: 98.4,
  respiratoryRate: 16,
  timestamp: 0,
};

const VitalsContext = createContext<VitalsContextValue>({
  current: INITIAL,
  history: [],
  playing: true,
  scenario: "none",
  togglePlay: () => {},
  reset: () => {},
  triggerCritical: () => {},
});

export function VitalsProvider({ children }: { children: React.ReactNode }) {
  const vitals = useVitalsSimulator();

  return (
    <VitalsContext.Provider value={vitals}>
      {children}
    </VitalsContext.Provider>
  );
}

export function useVitals() {
  return useContext(VitalsContext);
}
