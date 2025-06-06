"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    _id: 1,
    name: "Aarav Mehta",
    description: "This app understands my emotions better than I do. The song suggestions are always on point!",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    _id: 2,
    name: "Saanvi Sharma",
    description: "I love how personalized everything feels. The AI voice cloning is so cool!",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    _id: 3,
    name: "Vivaan Kapoor",
    description: "The mood tracking dashboard really helps me reflect on my mental state every week.",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    _id: 4,
    name: "Diya Verma",
    description: "5 free trials hooked me in. Upgraded to premium and it's worth every rupee!",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    _id: 5,
    name: "Arjun Singh",
    description: "Emotion-based music? Mind-blowing. I can't go back to regular playlists anymore.",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    _id: 6,
    name: "Isha Patel",
    description: "The daily mood prompt is my favorite ritual. It feels like self-care!",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    _id: 7,
    name: "Kabir Desai",
    description: "The karaoke feature with real-time emotion filtering is insanely fun!",
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    _id: 8,
    name: "Myra Reddy",
    description: "Being able to hear songs in my own voice is surreal. Such an immersive experience.",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    _id: 9,
    name: "Rohan Joshi",
    description: "Finally an app that doesn’t just throw random music at you. This is emotional intelligence in action.",
    image: "https://i.pravatar.cc/150?img=19",
  },
  {
    _id: 10,
    name: "Anaya Chauhan",
    description: "Love the weekly recap. It’s like Spotify Wrapped, but based on my actual feelings.",
    image: "https://i.pravatar.cc/150?img=20",
  },
];

const Testinomials = () => {
  const [currentTestinomial, setCurrentTestionmial] = useState(testimonials[0]);

  const length = testimonials?.length;
  const firstHalf = testimonials?.slice(0, Math.ceil(length / 2));
  const secondHalf = testimonials?.slice(Math.ceil(length / 2), length);

  return (
    <div className="bg-black w-full h-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20">
        <h4 className="text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">What our customers say?</h4>
        <div className="w-3xl mx-auto h-[60vh] bg-gradient-to-r from-purple-600 to-pink-300 relative rounded-3xl">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-10 z-50 text-center">
                <p className="text-3xl font-semibold text-white">{currentTestinomial.description}</p>
            </div>
            <div className="absolute -left-5 top-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <ChevronLeft className="text-white w-10 h-10 cursor-pointer" />
            </div>
            <div className="absolute -right-5 top-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-300 to-purple-500 flex items-center justify-center">
                <ChevronRight className="text-white w-10 h-10 cursor-pointer" />
            </div>
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-28 h-28 p-2 bg-black rounded-full">
                <Image src={currentTestinomial.image} alt={currentTestinomial.name} width={300} height={300} className="w-full h-full rounded-full object-cover" priority unoptimized quality={100} />
            </div>
        </div>
        <div className="flex gap-5 w-full items-center justify-center">
            {
                firstHalf.map((item) => (
                    <div className="w-20 h-20 rounded-full" key={item._id}>
                        <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                            <Image src={item.image} alt={item.name} width={300} height={300} className="w-full h-full rounded-full object-cover" priority unoptimized quality={100} />
                        </div>
                    </div>
                ))
            }
            <div className="flex flex-col gap-3 w-40 items-center">
                <p className="text-lg font-semibold text-white">{currentTestinomial.name}</p>
            </div>
            {
                secondHalf.map((item) => (
                    <div className="w-20 h-20 rounded-full" key={item._id}>
                        <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                            <Image src={item.image} alt={item.name} width={300} height={300} className="w-full h-full rounded-full object-cover" priority unoptimized quality={100} />
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Testinomials;
