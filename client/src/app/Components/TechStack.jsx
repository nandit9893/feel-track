"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const TechStack = ({ techStackData }) => {
  const [activeTab, setActiveTab] = useState(techStackData?.stack_categories?.[0]?._id);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [openSkillsMobile, setSkillsSetMobile] = useState(false);
  const [openSkillsMobileItems, setOpenSkillsMobileItems] = useState([]);

  const selectedTech = hoveredTech ? hoveredTech : techStackData?.stack_categories?.find((stack) => stack?._id === activeTab)?.description_points[0];

  const mobileTabsContainerRef = useRef(null);
  const mobileTabsRefs = useRef({});

  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!techStackData) {
      return;
    }
    const skillSet = techStackData?.stack_categories?.map((item) => ({
      _id: item._id,
      name: item.name
    }));
    setOpenSkillsMobileItems(skillSet);
  }, [techStackData]);

  useEffect(() => {
    if (!activeTab || !mobileTabsRefs.current[activeTab]) return;

    const activeTabElement = mobileTabsRefs.current[activeTab];
    const containerRect = mobileTabsContainerRef.current.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();

    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;

    setSliderStyle({ left, width });
  }, [activeTab, techStackData]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setHoveredTech(null);
  };

  const skillSetMobile = (id) => {
    setActiveTab(id);
    setSkillsSetMobile(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-700 to-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 lg:px-0 px-5 md:px-10">
        <h4 className="text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">{techStackData?.heading}</h4>
        <div className="md:flex hidden lg:flex-row flex-col gap-10 w-full items-center">
          <div className="w-full lg:w-1/4 bg-gradient-to-br flex flex-row lg:flex-col from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-100/30 overflow-hidden h-full">
            {
              techStackData?.stack_categories?.map((item, index) => (
                <div className={`relative flex items-center justify-between w-full p-3 lg:p-6 cursor-pointer transition-all duration-300 group ${activeTab === item?._id ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-4 border-purple-500" : "hover:bg-slate-700/50"} ${index !== techStackData?.stack_categories?.length - 1 ? "border-b border-slate-100/20" : "" }`} key={item?._id} onClick={() => handleTabClick(item?._id)}>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <div className={`w-2 lg:w-3 h-2 lg:h-3 rounded-full transition-all duration-300 ${activeTab === item?._id ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg" : "bg-slate-500 group-hover:bg-slate-400"}`}></div>
                    <p className={`font-medium tex-xl lg:text-2xl transition-all whitespace-nowrap duration-300 ${ activeTab === item?._id ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text" : "text-slate-200 group-hover:text-white" }`}>{item?.name}</p>
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
          <div className="w-full lg:w-3/4 rounded-2xl shadow-2xl border border-slate-100/30 overflow-hidden h-full lg:h-80 flex flex-col">
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
        <div className="md:hidden block w-full h-full">
          <div className="flex flex-col gap-5 w-full h-full">
            <div ref={mobileTabsContainerRef} className="relative sm:flex hidden w-full border border-slate-500 rounded-lg overflow-hidden h-12">
              <div className="absolute top-0 h-full bg-pink-500 rounded-lg transition-all duration-300 ease-in-out" style={{ left: sliderStyle.left, width: sliderStyle.width }}/>
                {
                  techStackData?.stack_categories?.map((item) => (
                    <div key={item?._id} ref={(el) => (mobileTabsRefs.current[item._id] = el)} onClick={() => handleTabClick(item._id)} className={`flex-1 flex items-center justify-center cursor-pointer relative z-10 px-2 whitespace-nowrap`}>
                      <p className={`font-medium text-base text-center ${activeTab === item?._id ? "text-white" : "text-gray-400"}`}>{item?.name}</p>
                    </div>
                  ))
                }
            </div>
            <div className="flex sm:hidden flex-col gap-3 w-full relative">
              <div onClick={() => setSkillsSetMobile(!openSkillsMobile)} className="flex items-center justify-between bg-pink-500 rounded-md py-2 px-5 cursor-pointer w-full">
                <p className="font-medium text-xl text-center text-white">{openSkillsMobileItems.find(item => item._id === activeTab)?.name || "Select"}</p>
                <ChevronDown className="w-8 h-8 text-white" />
              </div>
              {
                openSkillsMobile && (
                  <div className="absolute w-full top-12 bg-slate-900 z-50 h-60 overflow-y-auto rounded-b-md rounded-l-md rounded-r-md">
                    <div className="flex flex-col gap-1 w-full h-full">
                      {
                        openSkillsMobileItems?.map((item, index) => (
                          <p key={index} className="text-white py-2 px-4 hover:bg-slate-700 transition-colors duration-300 cursor-pointer" onClick={() => skillSetMobile(item._id)}>{item.name}</p>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
            <div className="flex flex-col gap-5 w-full h-full">
              {
                techStackData?.stack_categories?.find((category) => category?._id === activeTab)?.description_points?.map((skill) => (
                  <div className="flex sm:flex-row flex-col gap-2 sm:gap-5 w-full border h-full border-slate-500 rounded-lg items-center" key={skill?._id}>
                    <div className="flex flex-col gap-2 w-full sm:w-1/5 h-full p-3 items-center justify-center">
                      <p className="text-gray-300 font-semibold text-lg sm:text-base text-center">{skill?.name}</p>
                      <Image src={skill?.icon} alt={skill?.name} width={500} height={500} className="w-8 h-8 vibrate" priority unoptimized quality={100}/>
                    </div>
                    <hr className="w-[1px] h-20 bg-slate-500 sm:block hidden" />
                    <div className="w-full sm:w-4/5 h-full p-3">
                      <p className="text-gray-300 font-normal text-base text-center">{skill?.description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
