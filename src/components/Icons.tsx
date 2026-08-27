import React from "react";

type IconProps = { className?: string; style?: React.CSSProperties };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const GraduationCapIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
    <path d="M22 8v6" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" />
    <path d="M8 4.5H4.5v1.5a3.5 3.5 0 0 0 3.5 3.5" />
    <path d="M16 4.5h3.5V6A3.5 3.5 0 0 1 16 9.5" />
    <path d="M10 15.5v2.5M14 15.5v2.5" />
    <path d="M8.5 21h7" />
    <path d="M9.5 18h5v3h-5Z" />
  </svg>
);

export const FlameIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M12 2.5c1.1 3.6-2.6 4.8-2.6 8.3a2.6 2.6 0 0 0 5.2 0c0-1.6-.8-2.6-.8-2.6s1.8.9 1.8 3.6a4.4 4.4 0 0 1-8.8 0c0-5 3.6-6 5.2-9.3Z" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M9.3 4.2A2.6 2.6 0 0 0 6.9 7a2.8 2.8 0 0 0-1.8 4.6 2.8 2.8 0 0 0 1.8 4.6h.9a2.6 2.6 0 0 0 2.6-2.6V6a1.8 1.8 0 0 0-.9-1.8Z" />
    <path d="M14.7 4.2A2.6 2.6 0 0 1 17.1 7a2.8 2.8 0 0 1 1.8 4.6 2.8 2.8 0 0 1-1.8 4.6h-.9a2.6 2.6 0 0 1-2.6-2.6V6a1.8 1.8 0 0 1 .9-1.8Z" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3Z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M4.5 12.5 9 17l10.5-10.5" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20v-1.5A4 4 0 0 1 7.5 14.5h3a4 4 0 0 1 4 4V20" />
    <path d="M16 5.3a3 3 0 0 1 0 5.8" />
    <path d="M18.5 20v-1.5a4 4 0 0 0-2.6-3.75" />
  </svg>
);

export const BackpackIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    <path d="M6 9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9Z" />
    <path d="M9 12h6M10 3v3M14 3v3" />
  </svg>
);

export const CompassIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="m14.5 9.5-1.7 5-5 1.7 1.7-5 5-1.7Z" />
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M4 21V6l8-3 8 3v15" />
    <path d="M4 21h16M9 21v-4h6v4" />
    <path d="M9 9h.01M9 13h.01M15 9h.01M15 13h.01" />
  </svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.2a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.2 1-1.2 1.8" />
    <path d="M12 17h.01" />
  </svg>
);

export const HourglassIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M6 2.5h12M6 21.5h12" />
    <path d="M7 2.5v3.2c0 1.6.9 3 2.3 3.8L12 11l2.7-1.5A4.3 4.3 0 0 0 17 5.7V2.5" />
    <path d="M7 21.5v-3.2c0-1.6.9-3 2.3-3.8L12 13l2.7 1.5a4.3 4.3 0 0 1 2.3 3.8v3.2" />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M7 3h7l4 4v14H7Z" />
    <path d="M14 3v4h4" />
    <path d="M9.5 12.5h5M9.5 16h5" />
  </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} {...base}>
    <path d="M4 20V10M11 20V4M18 20v-7" />
    <path d="M4 20h14" />
  </svg>
);

