import { useTheme } from "@/lib/theme";

export default function PageBackground() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "var(--pg)",
        }}
      /> */}

      {/* Dot grid */}
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: dark ? 0.35 : 0.5,
          backgroundImage: `radial-gradient(circle, ${dark ? "rgba(56,201,188,0.18)" : "rgba(29,158,117,0.20)"} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      /> */}

      {/* Teal blob — top left */}
      {/* <div
        className="animate-blob"
        style={{
          position: "absolute",
          borderRadius: 9999,
          filter: "blur(40px)",
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          background: dark
            ? "radial-gradient(circle, rgba(56,201,188,0.18) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(79,209,197,0.16) 0%, transparent 65%)",
        }}
      /> */}

      {/* Green blob — center right */}
      {/* <div
        className="animate-blob-slow"
        style={{
          position: "absolute",
          borderRadius: 9999,
          filter: "blur(50px)",
          top: "20%",
          right: "-12%",
          width: "42vw",
          height: "42vw",
          maxWidth: 540,
          maxHeight: 540,
          background: dark
            ? "radial-gradient(circle, rgba(37,196,138,0.14) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(29,158,117,0.20) 0%, transparent 65%)",
        }}
      /> */}

      {/* Amber blob — bottom left */}
      {/* <div
        className="animate-blob"
        style={{
          position: "absolute",
          borderRadius: 9999,
          filter: "blur(50px)",
          bottom: "-10%",
          left: "5%",
          width: "36vw",
          height: "36vw",
          maxWidth: 460,
          maxHeight: 460,
          animationDelay: "-8s",
          background: dark
            ? "radial-gradient(circle, rgba(255,201,51,0.08) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 65%)",
        }}
      /> */}

      {/* Indigo blob — bottom right */}
      {/* <div
        className="animate-blob-slow"
        style={{
          position: "absolute",
          borderRadius: 9999,
          filter: "blur(50px)",
          bottom: "5%",
          right: "-8%",
          width: "30vw",
          height: "30vw",
          maxWidth: 380,
          maxHeight: 380,
          animationDelay: "-14s",
          background: dark
            ? "radial-gradient(circle, rgba(79,111,232,0.12) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(43,67,189,0.06) 0%, transparent 65%)",
        }}
      /> */}

      {/* Floating rings */}
      {/* <div
        className="animate-float-ring"
        style={{
          position: "absolute",
          width: 88,
          height: 88,
          borderRadius: 9999,
          border: dark
            ? "1.5px solid rgba(56,201,188,0.15)"
            : "1.5px solid rgba(29,158,117,0.12)",
          top: "13%",
          right: "19%",
        }}
      /> */}
      {/* <div
        className="animate-float-ring"
        style={{
          position: "absolute",
          width: 130,
          height: 130,
          borderRadius: 9999,
          border: dark
            ? "1.5px solid rgba(56,201,188,0.1)"
            : "1.5px solid rgba(79,209,197,0.09)",
          top: "44%",
          left: "3%",
          animationDelay: "-4s",
        }}
      /> */}
      {/* <div
        className="animate-float-ring"
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: 9999,
          border: dark
            ? "1px solid rgba(255,201,51,0.14)"
            : "1px solid rgba(245,158,11,0.12)",
          bottom: "22%",
          right: "28%",
          animationDelay: "-7s",
        }}
      /> */}

      {/* Floating dots */}
      {/* <div
        className="animate-float-dot"
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: 9999,
          background: dark ? "rgba(56,201,188,0.45)" : "rgba(29,158,117,0.3)",
          top: "16%",
          left: "8%",
        }}
      /> */}
      {/* <div
        className="animate-float-dot"
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: dark ? "rgba(255,201,51,0.5)" : "rgba(245,158,11,0.4)",
          top: "28%",
          right: "15%",
          animationDelay: "-3s",
        }}
      /> */}
      {/* <div
        className="animate-float-dot"
        style={{
          position: "absolute",
          width: 7,
          height: 7,
          borderRadius: 9999,
          background: dark ? "rgba(79,111,232,0.4)" : "rgba(43,67,189,0.22)",
          bottom: "30%",
          left: "22%",
          animationDelay: "-6s",
        }}
      /> */}
      {/* <div
        className="animate-float-dot"
        style={{
          position: "absolute",
          width: 5,
          height: 5,
          borderRadius: 9999,
          background: dark ? "rgba(56,201,188,0.3)" : "rgba(79,209,197,0.22)",
          bottom: "15%",
          right: "10%",
          animationDelay: "-10s",
        }}
      /> */}
    </div>
  );
}
