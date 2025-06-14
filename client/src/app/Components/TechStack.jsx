"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const TechStack = ({ techStackData }) => { console.log(techStackData)
  const [activeTab, setActiveTab] = useState(techStackData?.stack_categories?.[0]?._id);
  const [hoveredTech, setHoveredTech] = useState(null);

  const selectedTech = hoveredTech ? hoveredTech : techStackData?.stack_categories?.find((stack) => stack?._id === activeTab) ?.description_points[0];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setHoveredTech(null);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-700 to-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 lg:px-0 px-10">
        <h4 className="text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">{techStackData?.heading}</h4>
        <div className="flex gap-10 w-full items-center">
          <div className="w-1/4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-100/30 overflow-hidden h-full">
            {
              techStackData?.stack_categories?.map((item, index) => (
                <div className={`relative flex items-center justify-between w-full p-6 cursor-pointer transition-all duration-300 group ${activeTab === item?._id ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-4 border-purple-500" : "hover:bg-slate-700/50"} ${index !== techStackData?.stack_categories?.length - 1 ? "border-b border-slate-100/20" : "" }`} key={item?._id} onClick={() => handleTabClick(item?._id)}>
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTab === item?._id ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg" : "bg-slate-500 group-hover:bg-slate-400"}`}></div>
                    <p className={`font-medium text-2xl transition-all duration-300 ${ activeTab === item?._id ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text" : "text-slate-200 group-hover:text-white" }`}>{item?.name}</p>
                  </div>
                  {
                    activeTab === item?._id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg animate-pulse"></div>
                    )
                  }
                </div>
              ))
            }
          </div>
          <div className="w-3/4 rounded-2xl shadow-2xl border border-slate-100/30 overflow-hidden h-80 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-black">
              {
                techStackData?.stack_categories?.find((stack) => stack?._id === activeTab)?.description_points?.map((tech, index) => {
                  const isLastInRowLg = (index + 1) % 3 === 0;
                  const isHovered = hoveredTech?._id === tech?._id;
                  return (
                    <div key={tech._id} className={`flex flex-col items-center h-40 justify-center border-b bg-gradient-to-tr from-black to-slate-700 border-slate-100/30 p-6 relative group cursor-pointer transition-all duration-300 ${!isLastInRowLg ? "border-r" : ""}`} onMouseEnter={() => setHoveredTech(tech)} onMouseLeave={() => setHoveredTech(null)}>
                      <motion.div initial={{ y: 0, opacity: 1 }} animate={ isHovered ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="text-5xl text-pink-500">
                        <Image src={tech?.icon} alt={tech?.name} width={500} height={500} className="w-16 h-16 vibrate" priority unoptimized quality={100} />
                      </motion.div>
                      <motion.h3 initial={{ y: 20, opacity: 0 }} animate={ isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 } } transition={{ duration: 0.3 }} className="text-2xl font-semibold text-white mb-2 absolute">{tech?.name}</motion.h3>
                    </div>
                  );
                })
              }
            </div>
            {
              selectedTech && (
                <div className="flex items-center w-full justify-center bg-gradient-to-tr from-slate-700 to-black flex-grow p-5">
                  <AnimatePresence mode="wait">
                    <motion.p key={selectedTech?._id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.4 }} className="text-white text-lg text-center">{selectedTech?.description}</motion.p>
                  </AnimatePresence>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
