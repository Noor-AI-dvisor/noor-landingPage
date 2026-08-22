export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "var(--mesh-base)" }}
      aria-hidden="true"
    >
      <div
        className="absolute w-[560px] h-[560px] rounded-full blur-[110px] animate-blob-float"
        style={{
          top: "-12%",
          left: "-8%",
          background: "var(--mesh-1)",
        }}
      />
      <div
        className="absolute w-[620px] h-[620px] rounded-full blur-[130px] animate-blob-float"
        style={{
          top: "28%",
          right: "-14%",
          background: "var(--mesh-2)",
          animationDelay: "-3s",
        }}
      />
      <div
        className="absolute w-[420px] h-[420px] rounded-full blur-[100px] animate-blob-float"
        style={{
          bottom: "-6%",
          left: "18%",
          background: "var(--mesh-3)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute w-[480px] h-[480px] rounded-full blur-[120px] animate-blob-float"
        style={{
          bottom: "18%",
          right: "20%",
          background: "var(--mesh-1)",
          opacity: 0.6,
          animationDelay: "-1.5s",
        }}
      />
    </div>
  );
}
