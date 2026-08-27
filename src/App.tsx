import { lazy, Suspense, useEffect, useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import Nav from "./components/Nav";
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
      <AmbientBackground />
      <div className="relative z-10">
        <Nav />
        <Suspense fallback={null}>
          <ScrollStory />
        </Suspense>
      </div>
    </>
  );
}

export default App;
