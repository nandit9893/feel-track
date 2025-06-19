import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Features from "../Features";
import LiveDemo from "./LiveDemo";
import CTA from "../CTA";

const Home = ({ homeHeroSectionData, howHomeItWorksData, featuresData, ctaData, aboutPlanData }) => {
  return (
    <div className="w-full flex-col gap-5">
      <HeroSection homeHeroSectionData={homeHeroSectionData} />
      <hr className="w-full h-0.5 bg-gray-300" />
      <HowItWorks howHomeItWorksData={howHomeItWorksData} />
      <hr className="w-full h-0.5 bg-gray-300" />
      <Features featuresData={featuresData} />
      <hr className="w-full h-0.5 bg-gray-300" />
      <LiveDemo />
      <hr className="w-full h-0.5 bg-gray-300" />
      <CTA ctaData={ctaData} aboutPlanData={aboutPlanData} />
    </div>
  );
};

export default Home;
