// Small inline SVG icons. Inline SVG never fails to load (unlike an icon font)
// and inherits the text colour through `currentColor`.
type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

export function RadarMark({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 18.5 5.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function UploadIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
    </svg>
  );
}

export function GridIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </svg>
  );
}

export function ListIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

export function BuildingIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V5l8-2v17M12 8h8v12M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M2 20h20" />
    </svg>
  );
}

export function UserIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function AlertIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4 2.5 20h19L12 4ZM12 10v4M12 17h.01" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 12 4 4 10-10" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
