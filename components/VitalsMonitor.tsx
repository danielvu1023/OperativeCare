import { VITAL_RANGES } from "../utils/constants";
import { VitalsSnapshot } from "../utils/vitalsGenerator";
import VitalCard from "./VitalCard";

interface Props {
  current: VitalsSnapshot;
  history: VitalsSnapshot[];
}

const VITAL_KEYS = Object.keys(VITAL_RANGES) as (keyof typeof VITAL_RANGES)[];

export default function VitalsMonitor({ current, history }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {VITAL_KEYS.map((key) => (
        <VitalCard
          key={key}
          vitalKey={key}
          value={current[key as keyof VitalsSnapshot] as number}
          history={history}
        />
      ))}
    </div>
  );
}
