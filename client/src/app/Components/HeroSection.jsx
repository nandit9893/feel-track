import React from "react";

const HeroSection = ({ heroData }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video src={heroData?.videoURL} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
      <div className="relative top-1/8 z-10 flex flex-col gap-8 items-center justify-center h-full px-6 text-center w-full lg:max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[72px] md:leading-[84px] lg:leading-[96px] font-semibold tracking-tight drop-shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{heroData?.heading}</h1>
        <p className="text-white text-lg leading-[27px] md:text-xl md:leading-[37px] w-full lg:max-w-xl font-semibold drop-shadow">{heroData?.description}</p>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer text-lg leading-[24px] md:text-xl md:leading-[37px] text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">{heroData?.button?.title}</button>
      </div>
    </div>
  );
};

export default HeroSection;
