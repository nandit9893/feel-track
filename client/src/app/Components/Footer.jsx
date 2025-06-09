"use client";
import React from "react";
import { Facebook, Instagram, LinkedinIcon, Mail } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    return null;
  };
  
  return (
    <div className="w-full bg-black py-10">
      <div className="max-w-7xl mx-auto bg-gradient-to-bl from-pink-500 to-purple-500 rounded-tl-[100px] rounded-br-[100px] p-10 py-20">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex gap-5 w-full">
            <div className="w-2/5">
              <Image src="/feel-track.png" alt="FeelTrack Logo" width={500} height={500} className="rounded-tl-4xl rounded-br-4xl w-60" priority unoptimized quality={100} />
            </div>
            <div className="w-3/5 flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p className="text-white text-xl font-semibold transition-colors duration-300 hover:text-purple-900 cursor-pointer">Home</p>
                <p className="text-white text-xl font-semibold transition-colors duration-300 hover:text-purple-900 cursor-pointer">About</p>
                <p className="text-white text-xl font-semibold transition-colors duration-300 hover:text-purple-900 cursor-pointer">Vision</p>
                <p className="text-white text-xl font-semibold transition-colors duration-300 hover:text-purple-900 cursor-pointer">Features</p>
                <p className="text-white text-xl font-semibold transition-colors duration-300 hover:text-purple-900 cursor-pointer">Try Now</p>
              </div>
            <div className="w-1/2 flex gap-5">
              <a href="https://www.facebook.com/nandit.sharma.399" target="_blank"><Facebook className="text-white cursor-pointer w-12 h-12 bg-slate-900 border-[2px] border-white p-2 rounded-2xl hover:text-pink-500 hover:shadow-[0_0_5px_2px_#8B5CF6] transition-colors duration-300" /></a>
              <a href="https://www.instagram.com/nanditsharma063/?igsh=OHZjenBvbTZ4aTN4#" target="_blank"><Instagram className="text-white cursor-pointer w-12 h-12 bg-slate-900 border-[2px] border-white p-2 rounded-2xl hover:text-pink-500 hover:shadow-[0_0_5px_2px_#8B5CF6] transition-colors duration-300" /></a>
              <a href="https://www.linkedin.com/in/nandit-sharma-9a0174203/" target="_blank"><LinkedinIcon className="text-white cursor-pointer w-12 h-12 bg-slate-900 border-[2px] border-white p-2 rounded-2xl hover:text-pink-500 hover:shadow-[0_0_5px_2px_#8B5CF6] transition-colors duration-300" /></a>
              <a href="mailto:nanditsharma063@gmail.com"><Mail className="text-white cursor-pointer w-12 h-12 bg-slate-900 border-[2px] border-white p-2 rounded-2xl hover:text-pink-500 hover:shadow-[0_0_5px_2px_#8B5CF6] transition-colors duration-300" /></a>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-5 flex justify-between items-center">
        <p className="text-gray-400 text-sm font-medium">© 2025 Nandit Sharma All rights reserved.</p>
        <div className="flex gap-1 items-center">
          <p className="text-gray-400 text-sm font-medium">Developed by</p>
          <a href="https://nandit-sharma-developer.vercel.app/" target="_blank" className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text border-b border-transparent hover:border-pink-500">Nandit Sharma</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
