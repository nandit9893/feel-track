import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-20">
      <div className="bg-[#111827] mx-auto p-3 px-8 mt-5 max-w-5xl border border-white rounded-full">
        <div className="flex justify-between w-full items-center">
          <Image src="/feel-track.png" alt="FeelTrack Logo" width={100} height={100} className="w-12 h-12 rounded-2xl" priority unoptimized quality={100} />
          <div className="flex items-center gap-5">
            <p className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Home</p>
            <p className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">About</p>
            <p className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Vision</p>
            <p className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Features</p>
            <p className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Try Now</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="p-2 px-4 rounded-3xl text-white cursor-pointer transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Login</p>
            <p className="p-2 px-4 rounded-3xl text-white cursor-pointer transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Sign Up</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
