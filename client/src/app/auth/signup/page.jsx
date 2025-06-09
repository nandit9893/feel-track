"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Lock, Facebook, Instagram, Twitter, Eye, EyeOff, Mail, User, CircleCheckBig } from "lucide-react"
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignUpFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      const validations = {
        hasUpperCase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        minLength: value.length >= 8,
      };
      setPasswordValidation(validations);
    }
  };

  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false
  });

  const submitForm = async (event) => {
    event.preventDefault()
  }

  return (
    <div className="relative bg-slate-900 w-full h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="h-full w-full flex flex-col gap-3 p-5 py-10 relative z-10">
          <h2 className="text-lg font-semibold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">Create your account</h2>
          <form onSubmit={submitForm} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <p className="text-lg font-semibold text-gray-800">Name</p>
              <div className="flex justify-between items-center w-full gap-3">
                <User className="w-6 h-6 text-black flex-shrink-0" />
                <input required name="email" onChange={inputChangeHandler} value={signUpFormData.fullName} type="email" className="text-black text-lg w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Name" />
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
              <p className={`text-red-600 h-5 font-semibold text-sm ${showErrorMessage === "fullName" ? "block" : "hidden"}`}>{errorMessage}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-lg font-semibold text-gray-800">Email</p>
              <div className="flex justify-between items-center w-full gap-3">
                <Mail className="w-6 h-6 text-black flex-shrink-0" />
                <input required name="email" onChange={inputChangeHandler} value={signUpFormData.email} type="email" className="text-black text-lg w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Email" />
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
              <p className={`text-red-600 h-5 font-semibold text-sm ${showErrorMessage === "email" ? "block" : "hidden"}`}>{errorMessage}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-lg font-semibold text-gray-800">Password</p>
              <div className="flex justify-between items-center w-full gap-3">
                <Lock className="w-6 h-6 text-black flex-shrink-0" />
                <input required name="password" onChange={inputChangeHandler} value={signUpFormData.password} type={passwordVisible ? "text" : "password"} className="text-black text-lg w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Password"/>
                {
                  passwordVisible ? 
                  (
                    <EyeOff className="w-6 h-6 text-black cursor-pointer flex-shrink-0" onClick={() => setPasswordVisible(false)} />
                  ) 
                  : 
                  (
                    <Eye className="w-6 h-6 text-black cursor-pointer flex-shrink-0" onClick={() => setPasswordVisible(true)} />
                  )
                }
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
              <p className={`text-red-600 h-5 font-semibold text-sm ${showErrorMessage === "password" ? "block" : "hidden"}`}>{errorMessage}</p>
            </div>
            <button type="submit" className="w-full cursor-pointer rounded-xl h-12 mt-2 text-white text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-[1.02] duration-300">Create Account</button>
          </form>
          <div className="flex gap-3 items-center">
            <p className="text-black font-normal text-[16px]">Alreay have an account?</p>
            <Link href="/auth/login" className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-normal text-[16px] hover:from-purple-600 hover:to-pink-600">Login</Link>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-gray-800 font-medium">Password must contain:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <CircleCheckBig className={`w-5 h-5 rounded-full ${passwordValidation.minLength ? "text-pink-500" : "text-gray-600"}`} />
                <p className={`${passwordValidation.minLength ? "text-pink-500" : "text-gray-600"}`}>Minimum 8 characters</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className={`w-5 h-5 rounded-full ${passwordValidation.hasUpperCase ? "text-pink-500" : "text-gray-600"}`} />
                <p className={`${passwordValidation.hasUpperCase ? "text-pink-500" : "text-gray-600"}`}>At least one uppercase letter</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className={`w-5 h-5 rounded-full ${passwordValidation.hasNumber ? "text-pink-500" : "text-gray-600"}`} />
                <p className={`${passwordValidation.hasNumber ? "text-pink-500" : "text-gray-600"}`}>At least one number</p>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckBig className={`w-5 h-5 rounded-full ${passwordValidation.hasSpecialChar ? "text-pink-500" : "text-gray-600"}`} />
                <p className={`${passwordValidation.hasSpecialChar ? "text-pink-500" : "text-gray-600"}`}>At least one special character</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-1 rounded-lg bottom-5 w-12 h-auto p-2 bg-slate-900 z-50">
          <div className="flex flex-col gap-2 justify-center w-full items-center">
            <Instagram className="w-8 h-8 p-[6px] transition-colors duration-300 cursor-pointer text-white bg-[#2e2f63] hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 rounded-full" />
            <Facebook className="w-8 h-8 p-[6px] transition-colors duration-300 cursor-pointer text-white bg-[#2e2f63] hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 rounded-full" />
            <Twitter className="w-8 h-8 p-[6px] transition-colors duration-300 cursor-pointer text-white bg-[#2e2f63] hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 rounded-full" />
            <FaGoogle className="w-8 h-8 p-[6px] transition-colors duration-300 cursor-pointer text-white bg-[#2e2f63] hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp
