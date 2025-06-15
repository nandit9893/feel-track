"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="w-full bg-black">
      <div className="relative overflow-hidden h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-black via-[#B8860B] to-black"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col gap-10 w-full items-center justify-center mt-20">
            <h2 className="text-7xl font-semibold text-white text-center leading-[100px]">Simple & Transparent{" "}<span className="bg-gradient-to-r p-1 from-[#FFB606] to-black">Pricing</span></h2>
            <p className="text-white font-medium text-2xl max-w-3xl text-center">Start your journey with 5 free emotion-powered song sessions. Upgrade to premium for unlimited personalized music, voice playback, and full emotional wellness features — all for just{" "}<span className="text-[#FFD700] font-semibold">$20/month</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingPlans = ({ pricingData }) => {
  const [acitveCurrentPlan, setActiveCurrentPlan] = useState("monthly");

  return (
    <div className="w-full bg-black h-[115vh] py-10">
      <div className="relative overflow-hidden h-full">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-black via-slate-900/10 to-green-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        </div>
       <div className="absolute inset-x-0 max-w-7xl mx-auto z-10 h-full">
        <div className="flex flex-col gap-10 w-full items-center h-full">
          <div className="relative flex items-center bg-slate-800 p-3 rounded-full gap-3">
            <div className={`absolute top-3 left-3 w-24 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full transition-transform duration-300 ease-in-out ${ acitveCurrentPlan === "yearly" ? "translate-x-28" : "translate-x-0"}`}/>
            <p onClick={() => setActiveCurrentPlan("monthly")} className="relative z-10 p-2 px-5 cursor-pointer rounded-full text-white transition-colors duration-300">Monthly</p>
            <p onClick={() => setActiveCurrentPlan("yearly")} className="relative z-10 p-2 px-5 cursor-pointer rounded-full text-white transition-colors duration-300">Yearly</p>
          </div>
          <div className="grid grid-cols-3 w-full gap-10 h-full mb-20">
            {
              pricingData?.map((item, index) => (
                <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut", delay: index * 0.5 }}  viewport={{ once: false, amount: 0.2 }} className="w-full p-1 cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 h-full" key={index}>
                  <div className="bg-white flex flex-col gap-5 p-5 w-full rounded-xl items-center h-full">
                    <p className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-xl font-semibold">{item?.planName}</p>
                    <p className="text-gray-700 text-center text-sm font-medium">{item?.description}</p>
                    <AnimatePresence mode="wait">
                      <motion.div key={acitveCurrentPlan} initial={{ 1: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center">
                        <p className="text-3xl font-semibold text-black">$</p>
                        <p className="text-6xl font-semibold text-black">{acitveCurrentPlan === "monthly" ? `${item?.monthlyPrice}` : `${item?.yearlyPrice}`}</p>
                        <p className="text-6xl font-normal text-gray-800">/</p>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-normal text-gray-800">{acitveCurrentPlan === "monthly" ? "monthly" : "yearly"}</p>
                          <p className={`text-lg font-semibold bg-pink-500 text-white p-1 px-3 rounded-lg ${acitveCurrentPlan === "yearly" ? "block" : "hidden"}`}>{item?.discountPercentage}% off</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <button className="text-lg font-semibold text-white bg-pink-500 w-full py-2 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-pink-600">Get Started</button>
                    <div className="w-full h-0.5 bg-gray-400" />
                    <div className="flex flex-col gap-3 w-full">
                      {
                        item?.descriptionPoints?.map((point, index) => (
                          <div className="flex gap-3 items-center w-full" key={index}>
                            <Image src={point?.imageURL} alt="FeelTrack Logo" width={500} height={500} className=" w-5 h-5" priority unoptimized quality={100} />
                            <p className="text-sm font-normal text-gray-80">{point?.description}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

const Pricing = ({ pricingData }) => {
  return (
    <div>
      <HeroSection />
      <PricingPlans pricingData={pricingData} />
    </div>
  );
};

export default Pricing;
