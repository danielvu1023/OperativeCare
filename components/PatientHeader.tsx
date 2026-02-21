import { MOCK_PATIENT } from "../utils/constants";
import { User, Bed, Calendar, AlertCircle } from "lucide-react";

export default function PatientHeader() {
  const p = MOCK_PATIENT;
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex flex-wrap gap-6 items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
          <User size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-foreground">{p.name}</h2>
          <p className="text-sm text-foreground-muted">
            {p.age}y &middot; {p.mrn}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-foreground-subtle" />
          POD #{p.postOpDay}
        </span>
        <span className="flex items-center gap-1.5">
          <Bed size={14} className="text-foreground-subtle" />
          Room {p.room}
        </span>
        <span>{p.procedure}</span>
        <span className="text-foreground-muted">Surgeon: {p.surgeon}</span>
        <span className="flex items-center gap-1.5">
          <AlertCircle size={14} className="text-amber-500" />
          Allergies: {p.allergies.join(", ")}
        </span>
      </div>
    </div>
  );
}
