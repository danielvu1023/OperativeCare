import { SeverityLevel, SEVERITY_COLORS } from "../utils/constants";

interface Props {
  level: SeverityLevel;
  className?: string;
}

export default function SeverityBadge({ level, className = "" }: Props) {
  const c = SEVERITY_COLORS[level];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${c.bg} ${c.text} ${c.border} ${className}`}
    >
      {level}
    </span>
  );
}
