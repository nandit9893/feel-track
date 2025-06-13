"use client";
import React from "react";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuAudioWaveform } from "react-icons/lu";

const CTASection = () => {
  return (
    <div className="w-full bg-black h-full flex flex-col gap-40 py-20">
      <div className="max-w-5xl h-full mx-auto">
        <div className="w-full bg-[#0F0F0F] h-full flex justify-between rounded-xl">
          <div className="flex flex-col gap-10 p-10 w-full justify-center items-center">
            <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-3xl font-medium edu-cursive leading-[57px]">Feel your vibe, scan your soul, and let AI compose your soundtrack 🎧✨ — where emotion meets music, like never before.</motion.p>
            <motion.button initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-normal py-3 px-5 text-xl">Subscribe</motion.button>
          </div>
          <Image src="/feel-track.png" alt="FeelTrack Logo" width={500} height={500} className="w-96 rounded-r-xl" priority unoptimized quality={100} />
        </div>
      </div>
      <div className=" max-w-5xl mx-auto">
        <div className="flex justify-between w-full gap-10">
          <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="flex flex-col gap-8 w-1/2 justify-center">
            <div className="w-full">
              <h2 className="text-4xl font-bold text-white">Ready to tune your mind with{" "}
                <span className="text-pink-500">Music Therapy?</span>
              </h2>
            </div>
            <p className="text-gray-200 text-lg font-semibold leading-relaxed">Experience calm, focus, and emotional clarity with personalized music therapy. Let AI analyze your mood and recommend tracks thathelp you heal, reflect, and thrive.</p>
            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center gap-3">
                <CircleCheckBig className="text-pink-500 w-6 h-6" />
                <p className="text-gray-300 font-medium text-lg">Curated emotional soundtracks.</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="text-pink-500 w-6 h-6" />
                <p className="text-gray-300 font-medium text-lg">Backed by neuroscience & AI.</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className="text-pink-500 w-6 h-6" />
                <p className="text-gray-300 font-medium text-lg">Start now for just <span className="text-pink-500 font-bold  ">$20/month.</span></p>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-80">
                <button className="cursor-pointer relative overflow-hidden flex items-center justify-center bg-black w-full rounded-xl group">
                  <p className="px-6 py-3 text-lg font-semibold text-white z-10">Start Your Journey</p>
                  <LuAudioWaveform className="text-pink-500 w-6 h-6 z-10" />
                  <div className="code-rain absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                </button>
              </div>
              <p className="text-sm text-gray-400">Cancel anytime. No stress, just harmony.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="h-full w-1/2 flex flex-col gap-10">
            <div className="w-full h-full p-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
              <Image src="/pricing_home.jpg" alt="FeelTrack Logo" width={500} height={500} className="rounded-xl w-full" priority unoptimized quality={100} />
            </div>
            <div className="flex flex-col gap-5 w-full items-center">
              <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-4xl font-medium">Our Plans</h4>
              <div className="flex gap-5 w-full items-center">
                <div className="flex flex-col gap-1 w-full bg-gradient-to-bl from-pink-500 to-purple-500 items-center rounded-tl-4xl rounded-br-4xl border-2 border-white py-2.5">
                  <p className="text-white font-semibold text-xl">Basic</p>
                  <p className="text-white font-medium text-lg">$20/month</p>
                </div>
                <div className="flex flex-col gap-1 w-full bg-gradient-to-bl from-pink-500 to-purple-500 items-center rounded-tl-4xl rounded-br-4xl border-2 border-white py-2.5">
                  <p className="text-white font-semibold text-xl">Advanced</p>
                  <p className="text-white font-medium text-lg">$50/month</p>
                </div>
                <div className="flex flex-col gap-1 w-full bg-gradient-to-bl from-pink-500 to-purple-500 items-center rounded-tl-4xl rounded-br-4xl border-2 border-white py-2.5">
                  <p className="text-white font-semibold text-xl">Premium</p>
                  <p className="text-white font-medium text-lg">$80/month</p>
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
