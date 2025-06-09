"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const heading = "FEELTRACK";

const AboutHeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scaleOut, setScaleOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScaleOut(true);

      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev + 1 < heading.length ? prev + 1 : 0
        );
        setScaleOut(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-green-950/90 via-green-900/90 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-800/25 via-green-900/15 to-transparent"></div>
      </div>
      <div className="relative top-10 z-20 flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto">
        <Image src="/about_hero_image.png" alt="FeelTrack Logo" width={500} height={500} className="w-full rounded-2xl" priority unoptimized quality={100} />
        <div className="absolute w-80 h-80 top-52 flex items-center justify-center">
          <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center">
            <h2  className={`text-8xl text-white font-semibold transition-transform duration-700 ${scaleOut ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>{heading[currentIndex]}</h2>
            <Image src="/about_logo.png" alt="FeelTrack Logo" width={500} height={500} className="mt-10 w-24 rounded-2xl" priority unoptimized quality={100} />
          </div>
        </div>
      </div>
      <svg className="absolute top-0 right-0 w-[600px] h-[600px] z-10" viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="rgba(21, 128, 61, 0.9)" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>
        <path d="M0,400 C0,250 150,200 300,0 L0,0 Z" fill="url(#curveGradient)" transform="translate(400, 0) scale(-1, 1)" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] z-10" viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="curveGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="rgba(21, 128, 61, 0.9)" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>
        <path d="M0,400 C0,250 150,200 300,0 L0,0 Z" fill="url(#curveGradient2)" transform="scale(1, -1) translate(0, -400)" />
      </svg>
    </div>
  );
};

export default AboutHeroSection;
