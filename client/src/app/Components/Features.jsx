"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    _id: 1,
    title: "Emotion Detection via Retina Scan",
    description:
      "Analyze your mood through a simulated retina scan to understand your emotional state before suggesting the perfect track.",
    image: "./feature_1.jpg",
  },
  {
    _id: 2,
    title: "Daily Prompt Mood Input",
    description:
      "Tell us how your day was in a sentence or two. Our AI uses natural language processing to extract your emotional tone.",
    image: "./feature_2.png",
  },
  {
    _id: 3,
    title: "Smart Song Recommendations",
    description:
      "Receive AI-curated songs based on your mood and emotional input. Every track is tailored to how you feel.",
    image: "./feature_3.png",
  },
  {
    _id: 4,
    title: "Voice Cloning for Personalized Playback",
    description:
      "Choose to hear songs in your own voice or the original artist's. Feel more connected with your music.",
    image: "./feature_4.png",
  },
  {
    _id: 5,
    title: "Mood Analytics Dashboard",
    description:
      "Track your emotional trends over time and see how your music preferences evolve with your mood.",
    image: "./feature_5.jpg",
  },
  {
    _id: 6,
    title: "Download AI-Covered Songs",
    description:
      "Premium users can download personalized AI covers sung in their own cloned voice for offline listening.",
    image: "./feature_6.jpg",
  },
  {
    _id: 7,
    title: "Live Karaoke with Real-Time Emotion Filter",
    description:
      "Sing along with lyrics and watch how your voice dynamically adapts to different emotions in real-time.",
    image: "./feature_7.jpg",
  },
  {
    _id: 8,
    title: "5 Free Trials + Premium Access",
    description:
      "Get started with 5 emotion-based song suggestions for free, then unlock unlimited access for $20/month.",
    image: "./feature_8.jpg",
  },
  {
    _id: 9,
    title: "Weekly Mood-Based Music Recap",
    description:
      "Review a personalized weekly playlist and mood summary to reflect on how music matched your emotions.",
    image: "./feature_9.jpg",
  },
  {
    _id: 10,
    title: "AI Mood Coach",
    description:
      "Get uplifting messages, mood tips, and music therapy from an AI assistant when you're feeling low.",
    image: "./feature_10.jpg",
  },
];

const Features = () => {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="bg-black w-full h-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 lg:px-0 px-10">
        <h4 className="text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Features</h4>
        <div className="flex gap-5 items-center justify-center">
          {
            features.map((item, index) => (
              <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} onMouseLeave={() => setCurrentItem(null)} onMouseEnter={() => setCurrentItem(item._id)} className="p-[2px] cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" key={item._id}>
                <div className={`relative rounded-xl bg-slate-900 ${currentItem === item._id ? "w-80" : "w-16"} h-[500px] flex flex-col gap-5 p-4 transition-all duration-700 ease-in-out overflow-hidden`}>
                  <div className={`${ currentItem === item._id ? "opacity-0" : "opacity-100"} flex flex-row items-center justify-center h-full transition-opacity duration-300`} style={{ transform: currentItem === item._id ? "none" : "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap", gap: "20px" }}>
                    <p className="text-lg font-semibold text-white">{item._id}.</p>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                  </div>
                  <div className={`absolute inset-0 flex flex-col items-start justify-start gap-4 transition-opacity duration-500 px-6 py-10 ${ currentItem === item._id ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <Image src={item.image} alt={item.title} width={500} height={500} className="w-full h-56 rounded-2xl object-cover" priority unoptimized quality={100} />
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="text-sm font-medium text-gray-400 leading-[27px]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Features;
