import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import SetupSteps from "./components/SetupSteps";
import WhySection from "./components/WhySection";
import HowItWorks from "./components/HowItWorks";
import FaqSection from "./components/FaqSection";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import "./App.css";

function App() {
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

export default App;
