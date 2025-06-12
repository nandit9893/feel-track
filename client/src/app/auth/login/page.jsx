"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Lock, Eye, EyeOff, Mail } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { logIn, signInFailure, signInStart, signInSuccess } from "../../Redux/User/UserSlice.js";
import { useRouter } from "next/navigation";
import Loader from "../../Components/Loader";
import OAuth from "../../Components/OAuth";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, showError }= useSelector((state) => state.user);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    dispatch(signInStart());
    try {
      const response = await logIn(loginFormData);
      if (response?.data && response?.data?.success) {
        const user = response?.data?.data;
        dispatch(signInSuccess(user));
        setLoginFormData({
          email: "",
          password: "",
        });
        router.push("/");
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
    <div className="relative bg-slate-900 w-full h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 -right-20 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="h-full w-full flex flex-col gap-1 p-5 py-10 relative z-10">
          <h2 className="text-lg font-semibold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">Login your account</h2>
          <form onSubmit={submitForm} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col w-full">
              <p className="text-lg font-semibold text-gray-800">Email</p>
              <div className="flex justify-between items-center w-full gap-3">
                <Mail className="w-6 h-6 text-black flex-shrink-0" />
                <input required name="email" onChange={inputChangeHandler} value={loginFormData.email} type="email" className="text-black text-lg w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Email" />
              </div>
              <hr className="w-full h-0.5 bg-gray-200" />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-lg font-semibold text-gray-800">Password</p>
              <div className="flex justify-between items-center w-full gap-3">
                <Lock className="w-6 h-6 text-black flex-shrink-0" />
                <input required name="password" onChange={inputChangeHandler} value={loginFormData.password} type={passwordVisible ? "text" : "password"} className="text-black text-lg w-full font-light placeholder:text-gray-400 outline-none border-none bg-transparent" placeholder="Password"/>
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
            </div>
            <button disabled={loading} type="submit" className="w-full mt-3 flex items-center justify-center cursor-pointer rounded-xl h-10 text-white text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-[1.02] duration-300">{loading ? <Loader /> : "Login"}</button>
            <div className="h-5 flex items-center">
              <p className={`text-red-600 h-5 font-semibold text-sm ${showError ? "block" : "hidden"}`}>{error}</p>
            </div>
          </form>
          <div className="flex gap-3 items-center my-0.5">
            <p className="text-black font-normal text-[16px]">New User?</p>
            <Link href="/auth/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-normal text-[16px] hover:from-purple-600 hover:to-pink-600">Create Account</Link>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-1 w-full items-center">
              <hr className="bg-gray-300 w-full h-0.5" />
              <p className="text-sm font-semibold text-gray-500">or</p>
              <hr className="bg-gray-300 w-full h-0.5" />
            </div>
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
