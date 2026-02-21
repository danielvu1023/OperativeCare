import { Play, Pause, RotateCcw, Zap } from "lucide-react";
import { ScenarioType } from "../utils/vitalsGenerator";

interface Props {
  playing: boolean;
  scenario: ScenarioType;
  onTogglePlay: () => void;
  onReset: () => void;
  onTriggerCritical: () => void;
}

const SCENARIO_LABELS: Record<ScenarioType, string> = {
  none: "",
  hemorrhage: "Hemorrhage",
  sepsis: "Sepsis",
  respiratory: "Respiratory Distress",
  cardiac: "Cardiac Event",
};

export default function SimulationControls({
  playing,
  scenario,
  onTogglePlay,
  onReset,
  onTriggerCritical,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onTogglePlay}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-raised border border-border text-sm font-medium text-foreground hover:bg-border transition-colors"
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
        {playing ? "Pause" : "Play"}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-raised border border-border text-sm font-medium text-foreground hover:bg-border transition-colors"
      >
        <RotateCcw size={16} />
        Reset to Normal
      </button>
      <button
        onClick={onTriggerCritical}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-600 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
      >
        <Zap size={16} />
        Trigger Critical
      </button>
      {scenario !== "none" && (
        <span className="text-xs px-3 py-1 rounded-full bg-orange-50 border border-orange-600 text-orange-800 animate-pulse">
          Scenario: {SCENARIO_LABELS[scenario]}
        </span>
      )}
    </div>
  );
}
