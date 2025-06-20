"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HowItWorks = ({ howItWorksData }) => {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="bg-black w-full relative h-full">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>
      <div className="flex flex-col gap-10 max-w-7xl mx-auto justify-center relative z-10 h-full py-20 lg:px-0 px-5 sm:px-10">
        <h4 className="text-4xl md:text-6xl leading-[60px] md:leading-[84px] font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">{howItWorksData?.heading}</h4>
        <div className="flex flex-col gap-5 w-full items-center justify-center">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-10">
            {
              howItWorksData?.steps?.map((item, index) => {
                return (
                  <div onMouseLeave={() => setCurrentItem(null)} onMouseEnter={()=>setCurrentItem(item._id)} key={item._id} className="w-full flex flex-col gap-5 p-4 lg:p-8 rounded-xl bg-[#111827] border-gray-600 border cursor-pointer transition-transform hover:-translate-y-5 duration-300">
                    <AnimatePresence mode="wait">
                      <motion.div key={currentItem === item._id ? "icon" : "text"} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        {
                          currentItem === item._id ? 
                          (
                            <Image src={item?.imageURL} alt={item?.heading} width={500} height={500} className="w-6 h-6 invert" priority unoptimized quality={100} />
                          ) 
                          : 
                          (
                            <p className="md:text-xl md:leading-[34px] text-lg leading-[27px] font-semibold text-white">{index + 1}</p>
                          )
                        }
                      </motion.div>
                    </AnimatePresence>
                    <p className="md:text-xl md:leading-[34px] text-lg leading-[27px] font-semibold text-white">{item?.heading}</p>
                    <p className="text-base font-normal text-gray-400 leading-[24px]">{item?.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
