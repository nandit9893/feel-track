"use client";
import { requestOTPagain, resendOtpFailure, resendOtpStart, resendOtpSuccess, verifyOTP, verifyOtpFailure, verifyOtpStart, verifyOtpSuccess } from "../../Redux/User/UserSlice.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const VerifyUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, showError, currentUser } = useSelector((state) => state.user);
  const [timeLeft, setTimeLeft] = useState(59);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleResend = async (event) => {
    event.preventDefault();
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(59);
    dispatch(resendOtpStart());
    const resendData = {
      email: currentUser?.email,
      fullName: currentUser?.fullName,
    };
    try {
      const response = await requestOTPagain(resendData);
      if (response?.data?.success) {
        dispatch(resendOtpSuccess());
      } else {
        const errorMsg = response?.data?.message || "Failed to resend OTP.";
        dispatch(resendOtpFailure(errorMsg));
      }
    } catch (error) {
      const errMsg = error?.message || "Unexpected error occurred.";
      dispatch(resendOtpFailure(errMsg));
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    dispatch(verifyOtpStart());
    const otpVerificationData = {
      fullName: currentUser?.fullName,
      email: currentUser?.email,
      otp: otp.join(""), 
    }
    try {
      const response = await verifyOTP(otpVerificationData);
      if (response?.data?.success && response?.data?.data) {
        const user = response.data.data;
        dispatch(verifyOtpSuccess(user));
        router.push("/");
      } else {
        const errorMsg = response?.data?.message || "OTP verification failed";
        dispatch(verifyOtpFailure(errorMsg));
      }
    } catch (error) {
      const errMsg = error?.message || "Unexpected error occurred";
      dispatch(verifyOtpFailure(errMsg));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  useEffect(() => {
    if (currentUser?.isVerified === true) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="relative bg-slate-900 w-full h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl relative overflow-hidden p-10">
        <div className="absolute -top-36 -right-40 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="flex flex-col w-full gap-5 relative z-10">
          {
            loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-white/80 backdrop-blur-md">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )
          }          
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl font-bold text-center text-gray-900">OTP verification</h2>
            <p className="text-sm text-gray-600 text-center mt-2">Please enter the OTP (One-Time Password) sent to your registered email to complete your verification.</p>
          </div>
          <div className="flex gap-2 items-center w-full justify-center">
            {
              otp.map((digit, idx) => (
                <div key={idx} className="p-[2px] bg-slate-800 rounded-md focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:to-pink-500 transition duration-300">
                  <input type="text" id={`otp-${idx}`}value={digit} onChange={(e) => handleChange(e, idx)} onKeyDown={(e) => handleKeyDown(e, idx)} maxLength={1} className="w-12 h-12 bg-white rounded-md text-center text-lg border-none outline-none" disabled={loading} />
                </div>
              ))
            }
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-1 items-center">
              <p className="text-[16px] font-semibold text-black">Remaining time:</p>
              <p className="text-[16px] font-semibold text-black">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s</p>
            </div>
            <button onClick={handleResend} disabled={timeLeft !== 0 || loading} className={`font-medium ${timeLeft === 0 && !loading ? "text-blue-600 hover:underline" : "text-gray-400"}`}>Resend</button>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={handleVerify} disabled={loading} className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 font-semibold rounded-xl hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Verify</button>
          </div>
          <div className="h-5 flex items-center">
            <p className={`text-red-600 font-semibold text-sm ${showError ? "block" : "hidden"}`}>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;