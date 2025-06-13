import React from "react";

const HeroSection = ({ heroData }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video src={heroData?.videoURL} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
      <div className="relative top-1/4 z-10 flex flex-col items-center justify-center h-full px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-semibold mb-4 tracking-tight drop-shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{heroData?.heading}</h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-xl font-semibold drop-shadow">{heroData?.description}</p>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">{heroData?.button?.title}</button>
      </div>
    </div>
  );
};

export default HeroSection;
