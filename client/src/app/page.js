import React from "react";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import Features from "./Components/Features";
import LiveDemo from "./Components/LiveDemo";
import Testimonials  from "./Components/Testimonials ";
import CTASection from "./Components/CTASection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <Features />
      <LiveDemo />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default page;
