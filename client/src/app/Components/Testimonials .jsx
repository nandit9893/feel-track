"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    _id: 1,
    name: "Aarav Mehta",
    description:
      "This app understands my emotions better than I do. The song suggestions are always on point!",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    _id: 2,
    name: "Saanvi Sharma",
    description:
      "I love how personalized everything feels. The AI voice cloning is so cool!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    _id: 3,
    name: "Vivaan Kapoor",
    description:
      "The mood tracking dashboard really helps me reflect on my mental state every week.",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    _id: 4,
    name: "Diya Verma",
    description:
      "5 free trials hooked me in. Upgraded to premium and it's worth every rupee!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    _id: 5,
    name: "Arjun Singh",
    description:
      "Emotion-based music? Mind-blowing. I can't go back to regular playlists anymore.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    _id: 6,
    name: "Isha Patel",
    description:
      "The daily mood prompt is my favorite ritual. It feels like self-care!",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    _id: 7,
    name: "Kabir Desai",
    description:
      "The karaoke feature with real-time emotion filtering is insanely fun!",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    _id: 8,
    name: "Myra Reddy",
    description:
      "Being able to hear songs in my own voice is surreal. Such an immersive experience.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    _id: 9,
    name: "Rohan Joshi",
    description:
      "Finally an app that doesn’t just throw random music at you. This is emotional intelligence in action.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    _id: 10,
    name: "Anaya Chauhan",
    description:
      "Love the weekly recap. It’s like Spotify Wrapped, but based on my actual feelings.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentTestimonial = testimonials[currentIndex];
  const length = testimonials.length;
  const firstHalf = testimonials.slice(0, Math.ceil(length / 2));
  const secondHalf = testimonials.slice(Math.ceil(length / 2), length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleRight = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-black w-full h-full">
      {/* Desktop */}
      <div className="md:flex hidden max-w-7xl mx-auto flex-col gap-10 py-20 lg:px-0 px-10">
        <h4 className="text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">What our customers say?</h4>
        <div className="w-3xl mx-auto h-[60vh] bg-gradient-to-r from-purple-600 to-pink-300 relative rounded-3xl">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-10 text-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.p key={currentTestimonial?._id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-3xl font-medium edu-cursive text-white leading-[57px]">"{currentTestimonial?.description}"</motion.p>
            </AnimatePresence>
          </div>
          <div onClick={handleLeft} className="absolute -left-10 top-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <ChevronLeft className="text-white w-10 h-10 cursor-pointer" />
          </div>
          <div onClick={handleRight} className="absolute -right-10 top-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-300 to-purple-500 flex items-center justify-center">
            <ChevronRight className="text-white w-10 h-10 cursor-pointer" />
          </div>
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-28 h-28 p-2 bg-black rounded-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={currentTestimonial?._id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="w-full h-full rounded-full overflow-hidden">
                <Image src={currentTestimonial?.image} alt={currentTestimonial?.name} width={500} height={500} className="w-full h-full rounded-full object-cover" priority unoptimized quality={100}/>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-5 w-full items-center justify-center">
          {
            firstHalf.map((item, index) => (
              <div key={item?._id} onClick={() => setCurrentIndex(index)} className="w-16 h-16 rounded-full cursor-pointer">
                <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <Image src={item?.image} alt={item?.name} width={500} height={500} className="w-full h-full rounded-full object-cover" priority unoptimized quality={100} />
                </div>
              </div>
            ))
          }
          <div className="flex flex-col gap-3 w-40 items-center h-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p key={currentTestimonial?._id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.4 }} className="text-lg font-semibold text-white absolute">{currentTestimonial.name}</motion.p>
            </AnimatePresence>
          </div>
          {
            secondHalf.map((item, index) => (
              <div key={item._id} onClick={() => setCurrentIndex(index + firstHalf.length)} className="w-16 h-16 rounded-full cursor-pointer">
                <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <Image src={item.image} alt={item.name} width={500} height={500} className="w-full h-full rounded-full object-cover" priority unoptimized quality={100} />
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden block w-full">
        <div className="px-5 flex flex-col gap-8 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentTestimonial.name} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="flex flex-col gap-2 w-full h-40 items-center bg-slate-900 p-4 py-5 rounded-xl border border-gray-500">
              <p className="text-white font-semibold">{currentTestimonial.name}</p>
              <p className="text-gray-300 font-normal">{currentTestimonial.description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex h-8 gap-2 w-full items-center justify-center">
            {
              testimonials.map((_, index) => (
                <div key={index} onClick={() => setCurrentIndex(index)} className={`rounded-full cursor-pointer transition-all duration-300 ${currentIndex === index ? "bg-pink-500 scale-110 w-5 h-5" : "bg-gray-600 w-4 h-4"}`}></div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
