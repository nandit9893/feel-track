"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Lock, Eye, EyeOff, Mail, User, CircleCheckBig } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess, signUp } from "../../Redux/User/UserSlice.js";
import { useRouter } from "next/navigation";
import Loader from "../../Components/Loader";
import OAuth from "../../Components/OAuth";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, showError }= useSelector((state) => state.user);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profile_pic: null,
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
    minLength: false,
  });

  const submitForm = async (event) => {
    event.preventDefault();
    dispatch(signInStart());
    try {
      const response = await signUp(signUpFormData);
      if (response?.data && response?.data?.success) {
        const user = response?.data?.data;
        dispatch(signInSuccess(user));
        setSignUpFormData({
          fullName: "",
          email: "",
          password: "",
          profile_pic: null,
        });
        router.push("/auth/verify-user");
      } else {
        const errorMsg = response?.data?.message || "Signup failed";
        dispatch(signInFailure(errorMsg));
      }
    } catch (error) {
      const errMsg = error?.message || "Unexpected error occurred";
      dispatch(signInFailure(errMsg));
    }
  };

  return (
    <div className="relative bg-slate-900 w-full min-h-dvh flex items-center justify-center overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="w-full max-w-md rounded-3xl sm:bg-white shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 -right-20 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="h-full w-full flex flex-col gap-1 p-5 py-10 relative z-10">
          <h2 className="text-2xl sm:text-lg font-semibold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">Create your account</h2>
          <form onSubmit={submitForm} className="flex flex-col gap-5 sm:gap-3 w-full">
            <div className="flex flex-col w-full">
              <p className="text-lg font-normal sm:font-semibold text-white sm:text-gray-800">Name</p>
              <div className="flex justify-between items-center w-full gap-3">
                <User className="w-5 h-5 text-gray-300 sm:text-black flex-shrink-0" />
                <input required name="fullName" onChange={inputChangeHandler} value={signUpFormData.fullName} type="text" className="text-white sm:text-black text-[16px] w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Name" />
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-lg font-normal sm:font-semibold text-white sm:text-gray-800">Email</p>
              <div className="flex justify-between items-center w-full gap-3">
                <Mail className="w-5 h-5 text-gray-300 sm:text-black flex-shrink-0" />
                <input required name="email" onChange={inputChangeHandler} value={signUpFormData.email} type="email" className="text-white sm:text-black text-[16px] w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Email" />
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-lg font-normal sm:font-semibold text-white sm:text-gray-800">Password</p>
              <div className="flex justify-between items-center w-full gap-3">
                <Lock className="w-5 h-5 text-gray-300 sm:text-black flex-shrink-0" />
                <input required name="password" onChange={inputChangeHandler} value={signUpFormData.password} type={passwordVisible ? "text" : "password"} className="text-white sm:text-black text-[16px] w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Password"/>
                {
                  passwordVisible ? 
                  (
                    <EyeOff className="w-5 h-5 text-gray-300 sm:text-black cursor-pointer flex-shrink-0" onClick={() => setPasswordVisible(false)} />
                  ) 
                  : 
                  (
                    <Eye className="w-5 h-5 text-gray-300 sm:text-black cursor-pointer flex-shrink-0" onClick={() => setPasswordVisible(true)} />
                  )
                }
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
            </div>
            <button disabled={loading} type="submit" className="w-full flex items-center justify-center cursor-pointer rounded-xl h-10 text-white text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-[1.02] duration-300">{loading ? <Loader /> : "Create Account"}</button>
            <div className="h-5 flex items-center">
              <p className={`text-red-600 font-semibold text-sm ${showError ? "block" : "hidden"}`}>{error}</p>
            </div>
          </form>
          <div className="flex gap-3 items-center my-0.5">
            <p className="text-gray-300 sm:text-black font-normal text-[16px]">Alreay have an account?</p>
            {
              loading ? 
              (
                <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-normal text-[16px] hover:from-purple-600 hover:to-pink-600">Login</p>
              )
              :
              (
                <Link href="/auth/login" className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-normal text-[16px] hover:from-purple-600 hover:to-pink-600">Login</Link>
              )
            }
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-1 w-full items-center">
              <hr className="bg-gray-300 w-full h-0.5" />
              <p className="text-sm font-semibold text-gray-500">or</p>
              <hr className="bg-gray-300 w-full h-0.5" />
            </div>
            <OAuth />
          </div>
          <div className="flex flex-col w-full my-0.5">
            <p className="text-gray-300 sm:text-gray-800 sm:mb-0 mb-2 font-medium">Password must contain:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CircleCheckBig className={`w-4 h-4 rounded-full ${passwordValidation.minLength ? "text-pink-500" : "text-gray-300 sm:text-gray-600"}`} />
                <p className={`${passwordValidation.minLength ? "text-pink-500" : "text-gray-300 sm:text-gray-600"} text-sm`}>Minimum 8 characters</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className={`w-4 h-4 rounded-full ${passwordValidation.hasUpperCase ? "text-pink-500" : "text-gray-300 sm:text-gray-600"}`} />
                <p className={`${passwordValidation.hasUpperCase ? "text-pink-500" : "text-gray-300 sm:text-gray-600"} text-sm`}>At least one uppercase letter</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className={`w-4 h-4 rounded-full ${passwordValidation.hasNumber ? "text-pink-500" : "text-gray-300 sm:text-gray-600"}`} />
                <p className={`${passwordValidation.hasNumber ? "text-pink-500" : "text-gray-300 sm:text-gray-600"} text-sm`}>At least one number</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className={`w-4 h-4 rounded-full ${passwordValidation.hasSpecialChar ? "text-pink-500" : "text-gray-300 sm:text-gray-600"}`} />
                <p className={`${passwordValidation.hasSpecialChar ? "text-pink-500" : "text-gray-300 sm:text-gray-600"} text-sm`}>At least one special character</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp
