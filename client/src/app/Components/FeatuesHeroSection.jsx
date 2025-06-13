import React from "react";

const FeatuesHeroSection = () => {
  return (
    <div className="w-full bg-black">
      <div className="relative overflow-hidden h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-tl from-purple-900/30 via-slate-900/10 to-purple-900/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/50 via-transparent to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col gap-10 w-full items-center justify-center mt-20">
            <h2 className="text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Our core features</h2>
            <p className="text-white font-medium text-2xl max-w-3xl text-center">FeelTrack blends cutting-edge machine learning with deep emotional intelligence to deliver a truly personalized music experience. From retina-based emotion detection to real-time voice cloning, our features are designed to understand how you feel — and help you heal through music that resonates with your mood.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatuesHeroSection;
