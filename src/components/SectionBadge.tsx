export default function SectionBadge({
  label,
  variant = "green",
}: {
  label: string;
  variant?: "green" | "red" | "blue";
}) {
  const s =
    variant === "red"
      ? { bg: "#FEF2F2", border: "#FECACA", dot: "#EF4444", text: "#991B1B" }
      : variant === "blue"
        ? { bg: "#EFF6FF", border: "#BFDBFE", dot: "#3B82F6", text: "#1D4ED8" }
        : { bg: "#F0FDF4", border: "#BBF7D0", dot: "#1D9E75", text: "#065F46" };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 14px",
        borderRadius: 9999,
        marginBottom: 20,
        whiteSpace: "nowrap",
        border: "1px solid",
        background: s.bg,
        borderColor: s.border,
      }}
    >
      <span
        className="animate-pulse-dot"
        style={{
          display: "inline-block",
          flexShrink: 0,
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: s.dot,
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1.2px",
          color: s.text,
        }}
      >
        {label}
      </span>
    </div>
  );
}
