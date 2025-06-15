"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Features = ({ featuresData }) => {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="bg-black w-full h-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 lg:px-0 px-5 md:px-10">
        <h4 className="text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">{featuresData?.heading}</h4>
        <div className="hidden lg:flex gap-5 items-center justify-center">
          {
            featuresData?.features?.map((item, index) => (
              <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} onMouseLeave={() => setCurrentItem(null)} onMouseEnter={() => setCurrentItem(item?._id)} className="p-[2px] cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" key={item?._id}>
                <div className={`relative rounded-xl bg-slate-900 ${currentItem === item._id ? "w-80" : "w-16"} h-[500px] flex flex-col gap-5 p-4 transition-all duration-700 ease-in-out overflow-hidden`}>
                  <div className={`${ currentItem === item?._id ? "opacity-0" : "opacity-100"} flex flex-row items-center justify-center h-full transition-opacity duration-300`} style={{ transform: currentItem === item?._id ? "none" : "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap", gap: "20px" }}>
                    <p className="text-lg font-semibold text-white">{index + 1}.</p>
                    <p className="text-lg font-semibold text-white">{item?.title}</p>
                  </div>
                  <div className={`absolute inset-0 flex flex-col items-start justify-start gap-4 transition-opacity duration-500 px-6 py-10 ${ currentItem === item?._id ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <Image src={item?.imageURL} alt={item.title} width={500} height={500} className="w-full h-56 rounded-2xl object-cover" priority unoptimized quality={100} />
                    <p className="text-lg font-semibold text-white">{item?.title}</p>
                    <p className="text-sm font-medium text-gray-400 leading-[27px]">{item?.description}</p>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
        <div className="flex lg:hidden flex-col gap-5 w-full">
          {
            featuresData?.features?.map((item, index) => (
              <div key={item?._id} className="p-[2px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                <div className="flex flex-col gap-5 rounded-xl w-full p-3 px-4 bg-slate-900">
                  <div className="flex justify-between items-center cursor-pointer" onClick={()=>setCurrentItem(currentItem === item?._id ? null : item?._id)}>
                    <p className="text-base sm:text-lg font-normal text-white">{item?.title}</p>
                    <ChevronDown className={`text-pink-500 h-5 w-5 transition-transform duration-300 ${currentItem === item?._id ? "rotate-180" : "rotate-0"}`} />
                  </div>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${currentItem === item?._id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="flex gap-5 w-full items-center">
                      <p className="text-lg font-normal text-white">{item?.description}</p>
                      <Image src={item?.imageURL} alt={item.title} width={500} height={500} className="w-full h-56 rounded-2xl object-cover" priority unoptimized quality={100} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Features;
