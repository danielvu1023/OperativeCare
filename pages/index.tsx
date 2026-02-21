import { useVitals } from "@/contexts/VitalsContext";
import { evaluateVitals } from "@/utils/triageEngine";
import PatientHeader from "@/components/PatientHeader";
import SimulationControls from "@/components/SimulationControls";
import VitalsMonitor from "@/components/VitalsMonitor";
import TriagePanel from "@/components/TriagePanel";
import AlertFeed from "@/components/AlertFeed";

export default function Dashboard() {
  const { current, history, playing, scenario, togglePlay, reset, triggerCritical } =
    useVitals();

  const triage = evaluateVitals(current);

  return (
    <div className="space-y-4">
      <PatientHeader />
      <SimulationControls
        playing={playing}
        scenario={scenario}
        onTogglePlay={togglePlay}
        onReset={reset}
        onTriggerCritical={triggerCritical}
      />
      <VitalsMonitor current={current} history={history} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TriagePanel triage={triage} />
        <AlertFeed />
      </div>
    </div>
  );
}
