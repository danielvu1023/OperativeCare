import { VITAL_RANGES, PROVIDER_ROUTING, SeverityLevel } from "./constants";
import { VitalsSnapshot } from "./vitalsGenerator";

export interface TriageResult {
  severityLevel: SeverityLevel;
  routeTo: string;
  routeIcon: string;
  reason: string;
}

export function evaluateVitals(vitals: VitalsSnapshot): TriageResult {
  const reasons: string[] = [];
  const severityOrder: SeverityLevel[] = ["normal", "warning", "urgent", "critical"];
  let maxSeverityIndex = 0;

  const escalate = (level: SeverityLevel, reason: string) => {
    reasons.push(reason);
    const idx = severityOrder.indexOf(level);
    if (idx > maxSeverityIndex) {
      maxSeverityIndex = idx;
    }
  };

  const keys = ["heartRate", "systolicBP", "diastolicBP", "spO2", "temperature", "respiratoryRate"] as const;

  for (const key of keys) {
    const range = VITAL_RANGES[key];
    const val = vitals[key];

    if (val <= range.criticalLow) {
      escalate("critical", `${range.label} critically low (${val}${range.unit})`);
    } else if (val >= range.criticalHigh) {
      escalate("critical", `${range.label} critically high (${val}${range.unit})`);
    } else if (val <= range.warningLow) {
      const midpoint = (range.criticalLow + range.warningLow) / 2;
      if (val <= midpoint) {
        escalate("urgent", `${range.label} very low (${val}${range.unit})`);
      } else {
        escalate("warning", `${range.label} low (${val}${range.unit})`);
      }
    } else if (val >= range.warningHigh && range.warningHigh < range.max) {
      const midpoint = (range.warningHigh + range.criticalHigh) / 2;
      if (val >= midpoint) {
        escalate("urgent", `${range.label} very high (${val}${range.unit})`);
      } else {
        escalate("warning", `${range.label} high (${val}${range.unit})`);
      }
    }
  }

  // Multi-vital escalation: if 2+ warnings, escalate to urgent
  if (maxSeverityIndex === 1 && reasons.length >= 2) {
    maxSeverityIndex = 2;
  }

  const maxSeverity = severityOrder[maxSeverityIndex];

  const routing = PROVIDER_ROUTING[maxSeverity];

  return {
    severityLevel: maxSeverity,
    routeTo: routing.provider,
    routeIcon: routing.icon,
    reason: reasons.length > 0 ? reasons.join("; ") : "All vitals within normal range",
  };
}
