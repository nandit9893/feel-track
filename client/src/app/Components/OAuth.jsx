"use client";
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import app from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { googleSignMethod, signInFailure, signInStart, signInSuccess } from "../Redux/User/UserSlice.js";
import { useRouter } from "next/navigation";

const OAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.user);

  const handleGoogleFirebase = async (event) => {
    event.preventDefault();
    if(loading) {
      return;
    }
    dispatch(signInStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result?.user;
      const formData = {
        fullName: displayName,
        email,
        photoURL,
      };
      const response = await googleSignMethod(formData);
      if (response?.data && response?.data?.success) {
        const user = response?.data?.data;
        dispatch(signInSuccess(user));
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
    <div className="w-full">
      <button
        onClick={handleGoogleFirebase} disabled={loading} className="flex items-center justify-center cursor-pointer gap-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 transition duration-200">
        <Image src="/google_logo.png" alt="FeelTrack Logo" width={500} height={500} className="w-10" priority unoptimizedquality={100} />
        <span className="text-sm font-medium text-gray-700">Continue with Google</span>
      </button>
    </div>
  );
};

export default OAuth;
