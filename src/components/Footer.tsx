import logo from "../assets/images/logo-horizontal.png";
import logoDark from "../assets/images/logo-horizontal-dark.png";

export default function Footer({ theme }: { theme: "light" | "dark" }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--divider)",
        position: "relative",
        zIndex: 10,
        padding: "clamp(32px,5vh,56px) clamp(24px,8vw,120px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {theme === "dark" ? (
            <img src={logoDark} alt="Noor" className="nav-logo-icon" />
          ) : (
            <img src={logo} alt="Noor" className="nav-logo-icon" />
          )}
          <p
            style={{
              fontSize: 12,
              color: "var(--t-s)",
              fontFamily: "Instrument Serif, serif",
              fontStyle: "italic",
            }}
          >
            From curiosity to capability.
          </p>
        </div>

        <p style={{ fontSize: 12, color: "var(--t-s)", fontWeight: 600 }}>
          © 2026 Noor · Student-safe & private.
        </p>

        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 13,
                color: "var(--t-b)",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--a)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-b)")}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
