import React from "react";
import AdminDashboard from "./AdminDashboards";

const getHomeHeroSectinData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/hero`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch home hero section data");
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const getHomeHowItWorksSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/get/how/works`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const getFeaturesSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/get/features`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch featue section data");
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};


const page = async () => {
  const homeHeroSectionData = await getHomeHeroSectinData();
  const howHomeItWorksData = await getHomeHowItWorksSectionData();
  const featuresData = await getFeaturesSectionData();

  return (
    <div>
      <AdminDashboard homeHeroSectionData={homeHeroSectionData} howHomeItWorksData={howHomeItWorksData} featuresData={featuresData} />
    </div>
  );
};

export default page;
