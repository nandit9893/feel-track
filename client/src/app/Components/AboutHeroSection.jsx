import React from "react";

const AboutHeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-green-950/90 via-green-900/90 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-800/25 via-green-900/15 to-transparent"></div>
      </div>
      <div className="relative top-10 z-20 flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto">
        <div style={{ borderRadius: "60% 60% 60% 60%" }} className="relative w-md h-48 bg-white border-10 border-green-700 flex items-center justify-center">   
          {
            Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 2 * Math.PI;       
              const borderWidth = 8;
              const a = 448 / 2 + borderWidth / 2;
              const b = 192 / 2 + borderWidth / 2;     
              const x = a * Math.cos(angle);
              const y = b * Math.sin(angle);       
              return (
                <div key={i} className="absolute w-1.5 h-8 bg-black rounded-full" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 90}deg)`, transformOrigin: "center"}}></div>
              );
            })
          }       
          <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center shadow-inner" style={{ animation: "eyeWiggle 3s infinite linear" }}>
            <div className="w-12 h-12 bg-black rounded-full" ></div>
          </div>       
        </div>
        
      </div>
      <svg className="absolute top-0 left-0 w-[600px] h-[600px] z-10" viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="rgba(21, 128, 61, 0.9)" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>
        <path d="M0,400 C0,250 150,200 300,0 L0,0 Z" fill="url(#curveGradient)" />
      </svg>
      <svg className="absolute right-0 bottom-0 w-[600px] h-[600px] z-10" viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="curveGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="rgba(21, 128, 61, 0.9)" />{" "}
            <stop offset="100%" stopColor="#064e3b" />{" "}
          </linearGradient>
        </defs>
        <path d="M0,400 C0,250 150,200 300,0 L0,0 Z" fill="url(#curveGradient2)" transform="translate(400, 400) scale(-1, -1)" />
      </svg>
    </div>
  );
};

export default AboutHeroSection;
