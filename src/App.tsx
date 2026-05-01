import PageBackground from "@/components/PageBackground";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhoSection from "@/components/WhoSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Montserrat, sans-serif",
        minHeight: "100dvh",
        background: "var(--pg)",
      }}
    >
      <Nav />
      <HeroSection />
      <SolutionSection />
      <WhoSection />
      <EarlyAccessSection />
      <Footer />
    </div>
  );
}
