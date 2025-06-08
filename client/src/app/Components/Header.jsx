import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* for laptop */}
      <div className="bg-[#111827] mx-auto p-3 px-8 my-5 max-w-5xl border border-white rounded-full hidden lg:block overflow-hidden">
        <div className="flex justify-between w-full items-center">
          <Image src="/feel-track.png" alt="FeelTrack Logo" width={500} height={500} className="w-12 h-12 rounded-2xl" priority unoptimized quality={100} />
          <div className="flex items-center gap-5">
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Home</Link>
            <Link href="/about" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">About</Link>
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Vision</Link>
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Features</Link>
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Try Now</Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="p-2 px-4 rounded-3xl text-white cursor-pointer transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Login</p>
            <p className="p-2 px-4 rounded-3xl text-white cursor-pointer transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Sign Up</p>
          </div>
        </div>
      </div>

       {/* for mobile */}
       <div className="bg-[#111827] w-xs md:w-3xl sm:w-xl mx-auto my-5 rounded-full lg:hidden block overflow-hidden">
        <div className="flex justify-between w-full items-center py-2 px-5">
          <Image src="/feel-track.png" alt="FeelTrack Logo" width={500} height={500} className="w-10 rounded-full" priority unoptimized quality={100} />
          <Menu className="w-6 h-6 text-pink-500" />
        </div>
       </div>
    </header>
  );
};

export default Header;
