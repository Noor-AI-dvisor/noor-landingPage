import { lazy, Suspense, useEffect, useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import Nav from "./components/Nav";
import HeroMobile from "./components/HeroMobile";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import EarlyAccessSection from "./components/EarlyAccess";
import WhoSection from "./components/WhoSection";
import Footer from "./components/Footer";
import { useScrollTriggerAutoRefresh } from "./hooks/useScrollConnect";

const ScrollStory = lazy(() => import("./components/story/ScrollStory"));

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function App() {
  const isDesktop = useIsDesktop();
  useScrollTriggerAutoRefresh();

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <Nav />
        {isDesktop ? (
          <Suspense fallback={null}>
            <ScrollStory />
          </Suspense>
        ) : (
          <>
            <div id="home">
              <HeroMobile />
            </div>
            <ProblemSection />
            <SolutionSection />
            <WhoSection />
            <EarlyAccessSection />
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
