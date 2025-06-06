import React from "react";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import Features from "./Components/Features";
import LiveDemo from "./Components/LiveDemo";
import Testinomials from "./Components/Testinomials";

const page = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <Features />
      <LiveDemo />
      <Testinomials />
    </div>
  );
};

export default page;
