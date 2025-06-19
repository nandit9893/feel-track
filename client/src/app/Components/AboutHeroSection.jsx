"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const AboutHeroSection = ({ heroData }) => {
  const hero_heading_1 = heroData?.hero_heading_1 || [];
  const [subIndexFirst, setSubIndexFirst] = useState(0);
  const [deletingFirst, setDeletingFirst] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const hero_heading_2 = heroData?.hero_heading_2 || [];
  const [subIndexSecond, setSubIndexSecond] = useState(0);
  const [deletingSecond, setDeletingSecond] = useState(false);
  const [currentPhraseIndexSecond, setCurrentPhraseIndexSecond] = useState(0);

  useEffect(() => {
    if (hero_heading_1.length === 0) return;
    const currentText = hero_heading_1?.[currentPhraseIndex]?.text;
    if (!deletingFirst && subIndexFirst === currentText?.length) {
      const timeout = setTimeout(() => setDeletingFirst(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (deletingFirst && subIndexFirst === 0) {
      setDeletingFirst(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % hero_heading_1?.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndexFirst((prev) => prev + (deletingFirst ? -1 : 1));
    }, deletingFirst ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndexFirst, deletingFirst, currentPhraseIndex, hero_heading_1]);

  if (hero_heading_1.length === 0) return null;

  useEffect(() => {
    if (hero_heading_2.length === 0) return;
    const currentText = hero_heading_2?.[currentPhraseIndexSecond]?.text;
    if (!deletingSecond && subIndexSecond === currentText?.length) {
      const timeout = setTimeout(() => setDeletingSecond(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (deletingSecond && subIndexSecond === 0) {
      setDeletingSecond(false);
      setCurrentPhraseIndexSecond((prev) => (prev + 1) % hero_heading_2?.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndexSecond((prev) => prev + (deletingSecond ? -1 : 1));
    }, deletingSecond ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndexSecond, deletingSecond, currentPhraseIndexSecond, hero_heading_2]);

  if (hero_heading_1.length === 0) return null;
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-green-950/90 via-green-900/90 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-800/25 via-green-900/15 to-transparent"></div>
      </div>
      <div className="absolute left-20 top-32 w-md z-30">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl md:text-4xl font-semibold">{hero_heading_1?.[currentPhraseIndex]?.text?.substring(0, subIndexFirst)}|</h1>
      </div>
      <div className="relative top-0 z-20 flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto">
        <Image src={heroData?.firstImageURL} alt="FeelTrack Logo" width={500} height={500} className="w-full rounded-2xl" priority unoptimized quality={100} />
        <div className="absolute w-40 md:w-60 lg:w-80 h-40 md:h-60 lg:h-80 top-72 md:top-60 lg:top-52 flex items-center justify-center">
          <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center">
            <Image src={heroData?.secondImageURL} alt="FeelTrack Logo" width={500} height={500} className="mt-5 w-full rounded-2xl" priority unoptimized quality={100} />
          </div>
        </div>
      </div>
      <div className="absolute left-20 sm:right-20 bottom-20 lg:bottom-32 w-md z-30">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl md:text-4xl font-semibold">{hero_heading_2?.[currentPhraseIndexSecond]?.text?.substring(0, subIndexSecond)}|</h1>
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
