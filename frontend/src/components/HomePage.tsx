import Navbar from "./Navbar";
import Hero from "./Hero";
import Benefits from "./Benefits";
import SetupSteps from "./SetupSteps";
import WhySection from "./WhySection";
import HowItWorks from "./HowItWorks";
import FaqSection from "./FaqSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

/**
 * HomePage component - existing marketing site
 * Kept exactly as-is from original App.tsx
 */
export default function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Benefits />
      <SetupSteps />
      <WhySection />
      <HowItWorks />
      <FaqSection />
      <CallToAction />
      <Footer />
      <ChatWidget />
    </div>
  );
}

