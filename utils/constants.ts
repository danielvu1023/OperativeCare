export interface VitalRange {
  label: string;
  unit: string;
  min: number;
  max: number;
  criticalLow: number;
  criticalHigh: number;
  warningLow: number;
  warningHigh: number;
}

export const VITAL_RANGES: Record<string, VitalRange> = {
  heartRate: {
    label: "Heart Rate",
    unit: "bpm",
    min: 40,
    max: 180,
    criticalLow: 45,
    criticalHigh: 150,
    warningLow: 55,
    warningHigh: 110,
  },
  systolicBP: {
    label: "Systolic BP",
    unit: "mmHg",
    min: 60,
    max: 220,
    criticalLow: 80,
    criticalHigh: 200,
    warningLow: 95,
    warningHigh: 160,
  },
  diastolicBP: {
    label: "Diastolic BP",
    unit: "mmHg",
    min: 30,
    max: 140,
    criticalLow: 45,
    criticalHigh: 120,
    warningLow: 58,
    warningHigh: 95,
  },
  spO2: {
    label: "SpO₂",
    unit: "%",
    min: 70,
    max: 100,
    criticalLow: 88,
    criticalHigh: 101,
    warningLow: 92,
    warningHigh: 101,
  },
  temperature: {
    label: "Temperature",
    unit: "°F",
    min: 94,
    max: 106,
    criticalLow: 95.5,
    criticalHigh: 104,
    warningLow: 96.8,
    warningHigh: 100.9,
  },
  respiratoryRate: {
    label: "Resp Rate",
    unit: "br/min",
    min: 6,
    max: 40,
    criticalLow: 8,
    criticalHigh: 30,
    warningLow: 11,
    warningHigh: 22,
  },
};

export type SeverityLevel = "normal" | "warning" | "urgent" | "critical";

export const SEVERITY_COLORS: Record<SeverityLevel, { bg: string; text: string; border: string; glow: string }> = {
  normal:   { bg: "bg-green-50",   text: "text-green-800",  border: "border-green-600",  glow: "" },
  warning:  { bg: "bg-amber-50",   text: "text-amber-800",  border: "border-amber-600",  glow: "" },
  urgent:   { bg: "bg-orange-50",  text: "text-orange-800", border: "border-orange-600", glow: "shadow-orange-200 shadow-md" },
  critical: { bg: "bg-red-50",     text: "text-red-800",    border: "border-red-600",    glow: "shadow-red-200 shadow-lg ring-1 ring-red-300" },
};

export const PROVIDER_ROUTING: Record<SeverityLevel, { provider: string; icon: string }> = {
  normal: { provider: "Nurse (Floor)", icon: "Stethoscope" },
  warning: { provider: "Charge Nurse", icon: "UserCheck" },
  urgent: { provider: "Resident Physician", icon: "UserCog" },
  critical: { provider: "Attending + Rapid Response", icon: "AlertTriangle" },
};

export type ProviderRole = "nurse" | "charge_nurse" | "resident" | "attending";

export const ROLE_CONFIG: Record<ProviderRole, {
  label: string;
  description: string;
  icon: string;
  matchesRouteTo: string[];
  severityLevels: SeverityLevel[];
}> = {
  nurse:        { label: "Nurse (Floor)",       description: "Bedside monitoring & early warnings",    icon: "Stethoscope",   matchesRouteTo: ["Nurse (Floor)"],             severityLevels: ["normal"] },
  charge_nurse: { label: "Charge Nurse",        description: "Escalated warnings & team coordination", icon: "UserCheck",     matchesRouteTo: ["Charge Nurse"],              severityLevels: ["warning"] },
  resident:     { label: "Resident Physician",  description: "Urgent clinical interventions",          icon: "UserCog",       matchesRouteTo: ["Resident Physician"],        severityLevels: ["urgent"] },
  attending:    { label: "Attending Physician",  description: "Critical events & rapid response",       icon: "AlertTriangle", matchesRouteTo: ["Attending + Rapid Response"], severityLevels: ["critical"] },
};

export interface PatientInfo {
  name: string;
  age: number;
  mrn: string;
  procedure: string;
  surgeon: string;
  postOpDay: number;
  room: string;
  allergies: string[];
}

export const MOCK_PATIENT: PatientInfo = {
  name: "Jane Doe",
  age: 62,
  mrn: "MRN-2024-88431",
  procedure: "Total Hip Arthroplasty (R)",
  surgeon: "Dr. Amara Singh",
  postOpDay: 1,
  room: "4-212B",
  allergies: ["Penicillin", "Sulfa"],
};
