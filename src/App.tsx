import { lazy, Suspense, useEffect, useState } from "react";
import AmbientPresence from "./components/AmbientPresence";
import Nav from "./components/Nav";
import HeroMobile from "./components/HeroMobile";
import ProblemMobile from "./components/ProblemMobile";
import SolutionMobile from "./components/SolutionMobile";
import WhoMobile from "./components/WhoMobile";
import EarlyAccessMobile from "./components/EarlyAccessMobile";
import { useScrollTriggerAutoRefresh } from "./hooks/useScrollConnect";

const ScrollStory = lazy(() => import("./components/story/ScrollStory"));

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

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
      <AmbientPresence />
      <div className="relative z-10">
        <Nav />
        {isDesktop ? (
          <Suspense fallback={null}>
            <ScrollStory />
          </Suspense>
        ) : (
          <>
            <HeroMobile />
            <ProblemMobile />
            <SolutionMobile />
            <WhoMobile />
            <EarlyAccessMobile />
          </>
        )}
      </div>
    </>
  );
}

export default App;
