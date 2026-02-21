import { useEffect, useRef } from "react";
import { useVitals } from "@/contexts/VitalsContext";
import { useAlerts } from "@/contexts/AlertContext";
import { evaluateVitals } from "@/utils/triageEngine";

export default function AlertGenerator() {
  const { current } = useVitals();
  const { addAlert } = useAlerts();

  const triage = evaluateVitals(current);
  const prevSeverity = useRef(triage.severityLevel);

  useEffect(() => {
    if (triage.severityLevel !== prevSeverity.current) {
      addAlert({
        timestamp: Date.now(),
        severityLevel: triage.severityLevel,
        routeTo: triage.routeTo,
        reason: triage.reason,
        vitalsSnapshot: {
          heartRate: current.heartRate,
          systolicBP: current.systolicBP,
          diastolicBP: current.diastolicBP,
          spO2: current.spO2,
          temperature: current.temperature,
          respiratoryRate: current.respiratoryRate,
        },
      });
      prevSeverity.current = triage.severityLevel;
    }
  }, [triage, current, addAlert]);

  return null;
}
