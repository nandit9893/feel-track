"use client";
import React, { useState } from "react";
import { ScanFace, NotebookPen, Sparkles, BrainCircuit, SlidersHorizontal, Headphones, CreditCard} from "lucide-react";

const Icons = {
  ScanFace,
  NotebookPen,
  Sparkles,
  BrainCircuit,
  SlidersHorizontal,
  Headphones,
  CreditCard,
};

const how_it_works = [
  {
    _id: 1,
    title: "Open Your Camera for Retina Scan",
    icon: "ScanFace",
    description:
      "Grant access to your camera so our system can perform a quick retina scan. This safe and privacy-focused process analyzes your eye movements and expressions in real-time. By interpreting your emotional state through micro-signals, we tailor a musical experience that resonates with your current mood. It’s seamless, non-invasive, and takes just seconds to complete.",
  },
  {
    _id: 2,
    title: "Give a Brief Description About Your Day",
    icon: "NotebookPen",
    description:
      "Share a quick summary of how your day went — whether it was exciting, stressful, peaceful, or emotional. You can either type freely or pick from preset moods. This input helps us understand your context better. We blend this with your scanned emotions to create a deeper emotional profile for accurate music matching.",
  },
  {
    _id: 3,
    title: "Get a Recommended Song Instantly",
    icon: "Sparkles",
    description:
      "Based on your retina scan and mood description, a personalized song recommendation is instantly generated. Our system chooses the perfect song that matches your emotional wavelength. It’s like having a personal music therapist who gets your feelings. You'll receive a preview so you can jump right into the experience.",
  },
  {
    _id: 4,
    title: "ML Suggests the Best Match for You",
    icon: "BrainCircuit",
    description:
      "Our advanced machine learning model compares your emotional data with a vast library of music metadata and sentiment-tagged songs. It identifies patterns and selects the most emotionally resonant track for you. The result is not just any song — it’s *your* song for the moment. All done in a matter of seconds.",
  },
  {
    _id: 5,
    title: "Customize Your Listening Experience",
    icon: "SlidersHorizontal",
    description:
      "Once your song is ready, you get to choose how you want to hear it. Select from the original artist’s voice, a synthesized version in your own voice, or even a popular artist’s voice. This personalization adds a new layer of immersion and emotional connection to your music journey.",
  },
  {
    _id: 6,
    title: "Enjoy Your Song and Refresh Your Mood",
    icon: "Headphones",
    description:
      "Put on your headphones and dive into the song chosen just for you. Whether you're winding down or need an emotional boost, let the music work its magic. The immersive audio experience is designed to leave you feeling refreshed, seen, and uplifted.",
  },
  {
    _id: 7,
    title: "Free Trial and Subscription",
    icon: "CreditCard",
    description:
      "Enjoy up to 5 personalized song experiences with retina scans absolutely free. Want unlimited emotional music journeys? Subscribe for just $20/month to unlock full access to all premium features, voices, and advanced recommendations — anytime, anywhere.",
  },
];

const HowItWorks = () => {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="bg-black w-full relative h-full">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>
      <div className="flex flex-col gap-10 max-w-7xl mx-auto justify-center relative z-10 h-full py-20">
        <h4 className="text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">How it works?</h4>
        <div className="flex flex-col gap-5 w-full items-center justify-center">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-10">
            {
              how_it_works.map((item) => {
                const Icon = Icons[item.icon];
                return (
                  <div onMouseLeave={() => setCurrentItem(null)} onMouseEnter={()=>setCurrentItem(item._id)} key={item._id} className="w-full flex flex-col gap-5 p-8 rounded-xl bg-[#111827] border-gray-600 border cursor-pointer transition-transform hover:-translate-y-5 duration-300">
                    <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transition-transform duration-500" style={{ transform: currentItem === item._id ? "rotateY(180deg)" : "rotateY(0deg)"}}>
                      {
                        currentItem === item._id ? 
                        (
                          <Icon className="w-6 h-6 text-white" />
                        ) 
                        : 
                        (
                          <p className="text-xl font-semibold text-white">{item._id}</p>
                        )
                      }
                    </div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="text-sm font-semibold text-gray-400">{item.description}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
