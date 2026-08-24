import AmbientBackground from "./components/AmbientBackground";
import Nav from "./components/Nav";
import HeroStage from "./components/HeroStage";
import HeroMobile from "./components/HeroMobile";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import EarlyAccessSection from "./components/EarlyAccess";
import WhoSection from "./components/WhoSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <Nav />
        <div id="home">
          <HeroStage />
          <HeroMobile />
        </div>
        <ProblemSection />
        <SolutionSection />
        <WhoSection />
        <EarlyAccessSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
