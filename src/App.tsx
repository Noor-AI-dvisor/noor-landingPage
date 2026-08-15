import { useState, useEffect, useCallback } from "react";
import Nav from "./components/Nav";
import HeroStage from "./components/HeroStage";
import HeroMobile from "./components/HeroMobile";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import EarlyAccessSection from "./components/EarlyAccess";
import WhoSection from "./components/WhoSection";
import Footer from "./components/Footer";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("noor-theme") as Theme | null;
    if (stored) return stored;
    // if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    //   return "dark";
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("noor-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <div id="home">
        <HeroStage />
        <HeroMobile />
      </div>
      <ProblemSection />
      <SolutionSection />
      <WhoSection />
      <EarlyAccessSection />
      <Footer theme={theme} />
    </>
  );
}

export default App;
