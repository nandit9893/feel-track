"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import SideBar from "../Components/SideBar";
import pages from "../utils/admin.sidebar.pages";

const Admin = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const { loading, error, showError, currentAdmin } = useSelector((state) => state?.admin);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [width, setWidth] = useState(false);

  const togglePages = (item) => {
    if(currentPage === item._id) {
        setCurrentPage(null);
    } else {
        setCurrentPage(item._id);
    }
  };

  useEffect(() => {
    if (currentAdmin === null) {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [currentAdmin, router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader size={40} color="#3b82f6" />
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/5 h-full">
        <SideBar width={width} setWidth={setWidth} pages={pages} togglePages={togglePages} currentPage={currentPage} currentComponent={currentComponent} />
      </div>
      {/* <div className="w-4/5 h-full">
        <iframe src="https://feel-track.vercel.app/" className="w-full h-full border-0" title="Feel Track Application" allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; web-share" loading="lazy" />
      </div> */}
    </div>
  );
};

export default Admin;
