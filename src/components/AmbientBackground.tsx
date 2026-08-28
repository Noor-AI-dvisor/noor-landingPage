import { useEffect, useRef } from "react";
import type { CSSProperties, FC } from "react";

type ShapeProps = { className?: string; style?: CSSProperties };

// Graduation cap — mortarboard + tassel
const CapShape: FC<ShapeProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    <path d="M50 14 L94 34 L50 54 L6 34 Z" fill="currentColor" />
    <path d="M26 41 L26 64 Q50 78 74 64 L74 41 L50 52 Z" fill="currentColor" />
    <circle cx="88" cy="37" r="3.4" fill="currentColor" />
    <path
      d="M88 37 L88 60"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Open book
const BookShape: FC<ShapeProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style}>
    <path
      d="M50 24 Q22 13 6 22 L6 74 Q22 65 50 76 Q78 65 94 74 L94 22 Q78 13 50 24 Z"
      fill="currentColor"
    />
    <path
      d="M50 24 L50 76"
      stroke="var(--bg)"
      strokeWidth="2.5"
      fill="none"
      opacity="0.5"
    />
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

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// The 4 shapes take turns being the emphasized one as the page scrolls: cap
// at the very top, book/pencil through the middle, bulb by the bottom, each
// crossfading into the next rather than all 4 sitting at a fixed opacity
// forever. They keep their existing independent CSS float (animate-blob-
// float only touches transform, never opacity), so this just layers a
// scroll-driven fade on top via direct ref writes — same "compute once per
// rAF-throttled scroll frame, write to el.style directly" pattern used by
// the ScrollStory scroll-jacking, kept independent of it since this
// background is global and unrelated to ScrollStory's own scroll math.
const MIN_OPACITY = 0.1;

export default function AmbientBackground() {
  const shapeRefs = useRef<(HTMLElement | null)[]>([null, null, null, null]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shapeRefs.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? clamp(window.scrollY / maxScroll, 0, 1) : 0;
      const activeFloat = progress * (shapeRefs.current.length - 1);
      shapeRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = String(clamp(1 - Math.abs(activeFloat - i), MIN_OPACITY, 1));
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-wash"
      aria-hidden="true"
    >
      <div
        className="absolute w-[420px] h-[420px] blur-[46px] animate-blob-float"
        style={{ top: "-8%", left: "-6%" }}
        ref={(el) => { shapeRefs.current[0] = el; }}
      >
        <CapShape className="w-full h-full" style={{ color: "var(--mesh-1)" }} />
      </div>
      <div
        className="absolute w-[460px] h-[460px] blur-[50px] animate-blob-float"
        style={{ top: "26%", right: "-10%", animationDelay: "-3s" }}
        ref={(el) => { shapeRefs.current[1] = el; }}
      >
        <BookShape className="w-full h-full" style={{ color: "var(--mesh-2)" }} />
      </div>
      <div
        className="absolute w-[340px] h-[340px] blur-[42px] animate-blob-float"
        style={{ bottom: "-4%", left: "16%", animationDelay: "-6s" }}
        ref={(el) => { shapeRefs.current[2] = el; }}
      >
        <PencilShape className="w-full h-full" style={{ color: "var(--mesh-3)" }} />
      </div>
      <div
        className="absolute w-[380px] h-[380px] blur-[46px] animate-blob-float"
        style={{ bottom: "16%", right: "18%", animationDelay: "-1.5s" }}
        ref={(el) => { shapeRefs.current[3] = el; }}
      >
        <BulbShape className="w-full h-full" style={{ color: "var(--mesh-1)" }} />
      </div>
    </div>
  );
}
