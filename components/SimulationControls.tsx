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
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium hover:bg-slate-700 transition-colors"
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
        {playing ? "Pause" : "Play"}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium hover:bg-slate-700 transition-colors"
      >
        <RotateCcw size={16} />
        Reset to Normal
      </button>
      <button
        onClick={onTriggerCritical}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/40 border border-red-700 text-sm font-medium text-red-300 hover:bg-red-900/60 transition-colors"
      >
        <Zap size={16} />
        Trigger Critical
      </button>
      {scenario !== "none" && (
        <span className="text-xs px-3 py-1 rounded-full bg-orange-900/30 border border-orange-700 text-orange-400 animate-pulse">
          Scenario: {SCENARIO_LABELS[scenario]}
        </span>
      )}
    </div>
  );
}
