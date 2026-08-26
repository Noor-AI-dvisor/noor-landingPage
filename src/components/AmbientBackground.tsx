import type { CSSProperties, FC } from "react";

type ShapeProps = { className?: string; style?: CSSProperties };

// Graduation cap — mortarboard + tassel
const CapShape: FC<ShapeProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    <path d="M50 14 L94 34 L50 54 L6 34 Z" fill="currentColor" />
    <path d="M26 41 L26 64 Q50 78 74 64 L74 41 L50 52 Z" fill="currentColor" />
    <circle cx="88" cy="37" r="3.4" fill="currentColor" />
    <path d="M88 37 L88 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

// Open book
const BookShape: FC<ShapeProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    <path
      d="M50 24 Q22 13 6 22 L6 74 Q22 65 50 76 Q78 65 94 74 L94 22 Q78 13 50 24 Z"
      fill="currentColor"
    />
    <path d="M50 24 L50 76" stroke="var(--bg)" strokeWidth="2.5" fill="none" opacity="0.5" />
  </svg>
);

// Pencil
const PencilShape: FC<ShapeProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    <path d="M12 88 L8 97 L18 93 L78 33 L67 22 Z" fill="currentColor" />
    <path d="M67 22 L78 33 L88 23 L77 12 Z" fill="currentColor" />
  </svg>
);

// Lightbulb — idea / learning
const BulbShape: FC<ShapeProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    <circle cx="50" cy="42" r="27" fill="currentColor" />
    <rect x="38" y="66" width="24" height="9" rx="3" fill="currentColor" />
    <rect x="41" y="78" width="18" height="7" rx="2.5" fill="currentColor" />
  </svg>
);

export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-wash"
      aria-hidden="true"
    >
      <CapShape
        className="absolute w-[420px] h-[420px] blur-[46px] animate-blob-float"
        style={{ top: "-8%", left: "-6%", color: "var(--mesh-1)" }}
      />
      <BookShape
        className="absolute w-[460px] h-[460px] blur-[50px] animate-blob-float"
        style={{ top: "26%", right: "-10%", color: "var(--mesh-2)", animationDelay: "-3s" }}
      />
      <PencilShape
        className="absolute w-[340px] h-[340px] blur-[42px] animate-blob-float"
        style={{ bottom: "-4%", left: "16%", color: "var(--mesh-3)", animationDelay: "-6s" }}
      />
      <BulbShape
        className="absolute w-[380px] h-[380px] blur-[46px] animate-blob-float"
        style={{ bottom: "16%", right: "18%", color: "var(--mesh-1)", opacity: 0.6, animationDelay: "-1.5s" }}
      />
    </div>
  );
}
