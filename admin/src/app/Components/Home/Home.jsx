import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Features from "../Features";

const Home = ({ homeHeroSectionData, howHomeItWorksData, featuresData }) => {
  return (
    <div className="w-full flex-col gap-5">
      <HeroSection homeHeroSectionData={homeHeroSectionData} />
      <hr className="w-full h-0.5 bg-gray-300" />
      <HowItWorks howHomeItWorksData={howHomeItWorksData} />
      <hr className="w-full h-0.5 bg-gray-300" />
      <Features featuresData={featuresData} />
      <hr className="w-full h-0.5 bg-gray-300" />
    </div>
  );
};

export default Home;
