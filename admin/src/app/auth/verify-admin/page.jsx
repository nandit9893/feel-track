"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Shield, Clock } from "lucide-react";
import { verifyOTP, verifyOtpFailure, verifyOtpStart, verifyOtpSuccess } from "../../Redux/Admin/AdminSlice";
import Loader from "../../Components/Loader";

const VerifyUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, showError, currentAdmin } = useSelector((state) => state.admin);
  const [timeLeft, setTimeLeft] = useState(59);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (currentAdmin === null) {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [currentAdmin, router]);

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
    // Add resend OTP logic here
    setTimeLeft(59);
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    dispatch(verifyOtpStart());
    const otpVerificationData = {
      fullName: currentAdmin?.fullName,
      email: currentAdmin?.email,
      otp: otp.join(""),
      role: currentAdmin?.role,
    }
    try {
      const response = await verifyOTP(otpVerificationData);
      if (response?.data?.success && response?.data?.data) {
        const user = response.data.data;
        dispatch(verifyOtpSuccess(user));
        router.push("/admin-dashboard");
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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader size={40} color="#3b82f6" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        {
          loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
              <Loader size={40} color="#3b82f6" />
            </div>
          )
        }
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">OTP Verification</h1>
          <p className="text-gray-600">Please enter the OTP sent to your registered email to complete your verification</p>
        </div>
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">Enter 6-digit OTP</label>
            <div className="flex gap-2 justify-center">
              {
                otp.map((digit, idx) => (
                  <input disabled={loading} key={idx} type="text" id={`otp-${idx}`} value={digit} onChange={(e) => handleChange(e, idx)} onKeyDown={(e) => handleKeyDown(e, idx)} maxLength={1} className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none" />
                ))
              }
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Time remaining:</span>
            </div>
            <span className="text-sm font-bold text-gray-900">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s</span>
          </div>
          <button type="submit" disabled={loading || otp.some(digit => !digit)} className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 h-[44px] flex items-center justify-center rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? <Loader size={20} color="#fff" /> : "Verify OTP"}</button>
          <div className="text-center">
            <button type="button" onClick={handleResend} disabled={timeLeft !== 0 || loading} className={`cursor-pointer text-sm font-medium transition duration-200 ${ timeLeft === 0 && !loading ? "text-blue-600 hover:text-blue-800 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}>Didn't receive the code? Resend OTP</button>
          </div>
        </form>
        <div className="h-4 flex items-center mt-4">
          <p className={`text-red-600 font-medium text-sm ${showError ? "block" : "hidden"}`}>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;