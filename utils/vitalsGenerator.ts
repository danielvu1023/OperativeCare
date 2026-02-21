import { VITAL_RANGES } from "./constants";

export interface VitalsSnapshot {
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
  timestamp: number;
}

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const drift = (current: number, target: number, maxStep: number) => {
  const delta = target - current;
  const step = Math.min(Math.abs(delta), maxStep) * Math.sign(delta);
  return current + step + (Math.random() - 0.5) * maxStep * 0.5;
};

function normalBaseline(): VitalsSnapshot {
  return {
    heartRate: Math.round(72 + (Math.random() - 0.5) * 10),
    systolicBP: Math.round(122 + (Math.random() - 0.5) * 10),
    diastolicBP: Math.round(76 + (Math.random() - 0.5) * 6),
    spO2: Math.round(97 + (Math.random() - 0.5) * 2),
    temperature: Math.round((98.4 + (Math.random() - 0.5) * 0.6) * 10) / 10,
    respiratoryRate: Math.round(16 + (Math.random() - 0.5) * 3),
    timestamp: Date.now(),
  };
}

export type ScenarioType = "none" | "hemorrhage" | "sepsis" | "respiratory" | "cardiac";

interface ScenarioTargets {
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
}

const SCENARIO_TARGETS: Record<Exclude<ScenarioType, "none">, ScenarioTargets> = {
  hemorrhage: {
    heartRate: 135,
    systolicBP: 78,
    diastolicBP: 42,
    spO2: 91,
    temperature: 97.2,
    respiratoryRate: 26,
  },
  sepsis: {
    heartRate: 125,
    systolicBP: 85,
    diastolicBP: 50,
    spO2: 92,
    temperature: 103.2,
    respiratoryRate: 28,
  },
  respiratory: {
    heartRate: 115,
    systolicBP: 140,
    diastolicBP: 88,
    spO2: 84,
    temperature: 98.8,
    respiratoryRate: 34,
  },
  cardiac: {
    heartRate: 155,
    systolicBP: 88,
    diastolicBP: 55,
    spO2: 89,
    temperature: 98.0,
    respiratoryRate: 28,
  },
};

const SCENARIOS: ScenarioType[] = ["hemorrhage", "sepsis", "respiratory", "cardiac"];

export function pickRandomScenario(): ScenarioType {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

export function generateNextVitals(
  prev: VitalsSnapshot,
  scenario: ScenarioType
): VitalsSnapshot {
  const keys = ["heartRate", "systolicBP", "diastolicBP", "spO2", "temperature", "respiratoryRate"] as const;

  const next: VitalsSnapshot = { ...prev, timestamp: Date.now() };

  if (scenario === "none") {
    const baseline = normalBaseline();
    for (const key of keys) {
      const range = VITAL_RANGES[key];
      const raw = drift(prev[key], baseline[key], 2);
      next[key] = Math.round(clamp(raw, range.min, range.max) * 10) / 10;
    }
  } else {
    const targets = SCENARIO_TARGETS[scenario];
    for (const key of keys) {
      const range = VITAL_RANGES[key];
      const raw = drift(prev[key], targets[key], 4);
      next[key] = Math.round(clamp(raw, range.min, range.max) * 10) / 10;
    }
  }

  // Keep SpO2 and HR as integers
  next.spO2 = Math.round(next.spO2);
  next.heartRate = Math.round(next.heartRate);
  next.systolicBP = Math.round(next.systolicBP);
  next.diastolicBP = Math.round(next.diastolicBP);
  next.respiratoryRate = Math.round(next.respiratoryRate);

  return next;
}

export function generateCriticalVitals(): VitalsSnapshot {
  return {
    heartRate: 158,
    systolicBP: 72,
    diastolicBP: 38,
    spO2: 82,
    temperature: 104.2,
    respiratoryRate: 36,
    timestamp: Date.now(),
  };
}

export { normalBaseline };
