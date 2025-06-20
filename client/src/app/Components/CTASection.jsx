"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CTASection = ({ ctaData, aboutPlanData }) => {
  return (
    <div className="w-full bg-black h-full flex flex-col gap-40 py-20 lg:px-0 px-5 sm:px-10">
      <div className="max-w-5xl h-full mx-auto">
        <div className="w-full bg-[#0F0F0F] h-full flex lg:flex-row flex-col justify-between items-center rounded-xl">
          <div className="flex flex-col gap-10 p-5 sm:p-10 w-full justify-center items-center">
            <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text edu-cursive text-xl leading-[34px] md:text-4xl md:leading-[60px]">{ctaData?.description}</motion.p>
            <motion.button initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-normal py-3 px-5 text-lg leading-[27px] md:text-xl md:leading-[34px]">{ctaData?.button?.title}</motion.button>
          </div>
          <Image src={ctaData?.imageURL} alt="FeelTrack Logo" width={500} height={500} className="w-96 rounded-xl lg:rounded-r-xl" priority unoptimized quality={100} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between md:flex-row flex-col w-full gap-5 lg:gap-10">
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="flex flex-col gap-8 w-full md:w-1/2 justify-center">
            <div className="w-full">
              <h2 className="text-4xl leading-[60px] font-semibold text-white">{aboutPlanData?.heading?.firstSubHeading}{" "}
                <span className="text-pink-500">{aboutPlanData?.heading?.secondSubHeading}</span>
              </h2>
            </div>
            <p className="text-gray-200 text-lg leading-[27px] font-normal">{aboutPlanData?.description}</p>
            <div className="flex flex-col w-full gap-3">
              {
                aboutPlanData?.descriptionPoints?.map((item) => (
                  <div className="flex items-start sm:items-center gap-3" key={item?._id}>
                    <Image src={item?.imageURL} alt="FeelTrack Logo" width={500} height={500} className="w-5 sm:w-6 h-5 sm:h-6" priority unoptimized quality={100} />
                    <p className="text-gray-300 font-medium text-lg leading-[27px]">{item?.title}</p>
                  </div>
                ))
              }
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-80">
                <button className="cursor-pointer relative overflow-hidden flex items-center justify-center bg-black w-full rounded-xl group">
                  <p className="px-6 py-3 text-lg leading-[27px] font-semibold text-white z-10">{aboutPlanData?.button?.title}</p>
                  <Image src={aboutPlanData?.button?.imageURL} alt="FeelTrack Logo" width={500} height={500} className="w-6 h-6 z-10" priority unoptimized quality={100} />
                  <div className="code-rain absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                </button>
              </div>
              <p className="text-base leading-[24px] text-gray-400">{aboutPlanData?.button?.subheading}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="h-full w-full md:w-1/2 flex flex-col gap-10">
            <div className="w-full h-full p-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
              <Image src={aboutPlanData?.imageURL} alt="FeelTrack Logo" width={500} height={500} className="rounded-xl w-full" priority unoptimized quality={100} />
            </div>
            <div className="flex flex-col gap-5 w-full items-center">
              <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-4xl leading-[57px]">Our Plans</h4>
              <div className="flex gap-5 lg:flex-row flex-col w-full items-center">
                <div className="flex flex-col gap-1 w-full bg-gradient-to-bl from-pink-500 to-purple-500 items-center rounded-tl-4xl rounded-br-4xl border-2 border-white py-2.5">
                  <p className="text-white font-semibold text-base leading-[24px] md:text-lg md:leading-[27px]">Basic</p>
                  <p className="text-white font-normal text-base leading-[24px] md:text-lg md:leading-[27px]">$20/month</p>
                </div>
                <div className="flex flex-col gap-1 w-full bg-gradient-to-bl from-pink-500 to-purple-500 items-center rounded-tl-4xl rounded-br-4xl border-2 border-white py-2.5">
                  <p className="text-white font-semibold text-base leading-[24px] md:text-lg md:leading-[27px]">Advanced</p>
                  <p className="text-white font-normal text-base leading-[24px] md:text-lg md:leading-[27px]">$50/month</p>
                </div>
                <div className="flex flex-col gap-1 w-full bg-gradient-to-bl from-pink-500 to-purple-500 items-center rounded-tl-4xl rounded-br-4xl border-2 border-white py-2.5">
                  <p className="text-white font-semibold text-base leading-[24px] md:text-lg md:leading-[27px]">Premium</p>
                  <p className="text-white font-normal text-base leading-[24px] md:text-lg md:leading-[27px]">$80/month</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
