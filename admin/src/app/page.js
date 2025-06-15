"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff, Mail, UserCheck, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logIn, signInFailure, signInStart, signInSuccess } from "./Redux/Admin/AdminSlice";
import Loader from "./Components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, showError }= useSelector((state) => state.admin);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signInStart());
    try {
      const response = await logIn(loginFormData);
      if (response?.data && response?.data?.success) {
        const admin = response?.data?.data;
        dispatch(signInSuccess(admin));
        setLoginFormData({
          email: "",
          password: "",
          role: "admin",
        });
        router.push("/auth/verify-admin");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-5 h-5 text-gray-600" />
              <input type="email" id="email" name="email" value={loginFormData.email} onChange={inputChangeHandler} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none" placeholder="Enter your email" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-5 h-5 text-gray-600" />
              <input type={passwordVisible ? "text" : "password"} id="password" name="password" value={loginFormData.password} onChange={inputChangeHandler} className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none" placeholder="Enter your password" />
              {
                passwordVisible ? 
                (
                  <EyeOff className="absolute right-3 w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-600" onClick={() => setPasswordVisible(false)} />
                ) 
                : 
                (
                  <Eye className="absolute right-3 w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-600" onClick={() => setPasswordVisible(true)} />
                )
              }
            </div>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="relative flex items-center">
              <UserCheck className="absolute left-3 w-5 h-5 text-gray-600 z-10" />
              <select id="role" name="role" value={loginFormData.role} onChange={inputChangeHandler} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-white appearance-none">
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <div className="absolute right-3 pointer-events-none">
                <ChevronDown className="text-gray-600 z-10" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 h-[44px] flex items-center justify-center rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">{loading ? <Loader size={40} color="#fff" /> : "Sign In"}</button>
        </form>
        <div className="h-4 flex items-center mt-3">
          <p className={`text-red-600 h-4 font-semibold text-sm ${showError ? "block" : "hidden"}`}>{error}</p>
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition duration-200">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;