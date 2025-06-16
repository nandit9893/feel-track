"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import SideBar from "../Components/SideBar";
import pages from "../utils/admin.sidebar.pages";
import { setPageInfo, setComponentInfo, resetNavigation } from "../Redux/Admin/AdminSlice";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";

const AdminDashboard = ({ homeHeroSectionData, howHomeItWorksData, featuresData }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, showError, currentAdmin, currentPage, currentPageID, currentPageTitle, currentComponent, currentComponentID, currentComponentTitle } = useSelector((state) => state?.admin);
  const [width, setWidth] = useState(false);
  const currentPageData = pages.find((page) => page._id === currentPage);

  const togglePages = (item) => {
    if (currentPage === item._id) {
      dispatch(resetNavigation());
    } else {
      dispatch(
        setPageInfo({
          page: item._id,
          pageID: item._id,
          pageTitle: item.title,
        })
      );
      dispatch(
        setComponentInfo({
          component: null,
          componentID: null,
          componentTitle: null,
        })
      );
    }
  };

  const selectComponent = (component) => {
    dispatch(
      setComponentInfo({
        component: component._id,
        componentID: component._id,
        componentTitle: component.title,
      })
    );
  };

  useEffect(() => {
    if (currentAdmin === null) {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [currentAdmin, router]);

  // if (!isAuthorized) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  //       <Loader size={40} color="#3b82f6" />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/5 h-full">
        <SideBar width={width} setWidth={setWidth} pages={pages} togglePages={togglePages} selectComponent={selectComponent} currentPage={currentPage} currentComponent={currentComponent}/>
      </div>
      <hr className="w-[1px] h-screen bg-gray-400" />
      <div className="w-4/5 h-full overflow-y-auto">
        { currentPageTitle === "Home" && <Home homeHeroSectionData={homeHeroSectionData} howHomeItWorksData={howHomeItWorksData} featuresData={featuresData} /> }
        { currentPageTitle === "About" && <About /> }
      </div>
    </div>
  );
};

export default AdminDashboard;