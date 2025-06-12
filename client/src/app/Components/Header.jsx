"use client";
import { LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, logoutUserFailure, logoutUserStart, logoutUserSuccess } from "../Redux/User/UserSlice";
import { persistor } from "../Redux/Store";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, error, showError, currentUser } = useSelector((state) => state.user); 
  const pathname = usePathname();

  if (pathname === "/auth/login" || pathname === "/auth/signup" || pathname === "/auth/verify-user" || pathname === "/auth/forgot-password") {
    return null;
  };

  const logOutUser = async () => {
    dispatch(logoutUserStart());
    try {
      const response = await logOut();
      if (response?.data && response?.data?.success) {
        dispatch(logoutUserSuccess());
        await persistor.purge();
        await persistor.flush();
      } else {
        const errorMsg = response?.data?.message || "Logout failed";
        dispatch(logoutUserFailure(errorMsg));
      }
    } catch (error) {
      const errMsg = error?.message || "Unexpected error occurred";
      dispatch(logoutUserFailure(errMsg));
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* for laptop */}
      <div className="bg-[#111827] mx-auto p-3 px-8 my-5 max-w-5xl border border-white rounded-full hidden lg:block overflow-hidden">
        <div className="flex justify-between w-full items-center">
          <Link href="/">
            <Image src="/feel-track.png" alt="FeelTrack Logo" width={500} height={500} className="w-12 h-12 rounded-2xl" priority unoptimized quality={100} />
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Home</Link>
            <Link href="/about" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">About</Link>
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Vision</Link>
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Features</Link>
            <Link href="/" className="text-white text-lg font-medium transition-colors duration-300 hover:text-pink-400 cursor-pointer">Try Now</Link>
          </div>
          <div className="flex items-center gap-3">
            {
              currentUser ? 
              (
                <div className="flex items-center gap-4">
                  <div onClick={logOutUser} className="group flex gap-2 text-white cursor-pointer items-center hover:text-white bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    <LogOut className="w-4 h-4" />
                    <p className="text-sm font-medium">Logout</p>
                  </div>
                  <div className="relative p-0.5 cursor-pointer rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:scale-110 transition-transform duration-300 hover:shadow-lg hover:shadow-purple-500/40">
                    {
                      currentUser?.profile_pic ? 
                      (
                        <Image src={currentUser?.profile_pic} alt="FeelTrack Logo" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-gray-900" priority unoptimized quality={100} />
                      ) 
                      : 
                      (
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )
                    }
                  </div>
                </div>
              ) 
              : 
              (
                <>
                  <Link href="/auth/login" className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative text-sm font-medium">Login</span>
                  </Link>
                  <Link href="/auth/signup" className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-600 hover:to-pink-600">
                    <span className="text-sm font-medium">Sign Up</span>
                  </Link>
                </>
              )
            }
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
