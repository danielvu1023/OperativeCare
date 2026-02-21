import { MOCK_PATIENT } from "../utils/constants";
import { User, Bed, Calendar, AlertCircle } from "lucide-react";

export default function PatientHeader() {
  const p = MOCK_PATIENT;
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap gap-6 items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center">
          <User size={20} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">{p.name}</h2>
          <p className="text-sm text-slate-400">
            {p.age}y &middot; {p.mrn}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-slate-500" />
          POD #{p.postOpDay}
        </span>
        <span className="flex items-center gap-1.5">
          <Bed size={14} className="text-slate-500" />
          Room {p.room}
        </span>
        <span>{p.procedure}</span>
        <span className="text-slate-400">Surgeon: {p.surgeon}</span>
        <span className="flex items-center gap-1.5">
          <AlertCircle size={14} className="text-amber-500" />
          Allergies: {p.allergies.join(", ")}
        </span>
      </div>
    </div>
  );
}
