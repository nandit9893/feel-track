import React from "react";
import FeatuesHeroSection from "../Components/FeatuesHeroSection";
import Features from "../Components/Features";

const getFeaturesSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/get/features`,
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

const Feature = async () => {
  const featuresData = await getFeaturesSectionData();

  return (
    <div>
      <FeatuesHeroSection />
      <Features featuresData={featuresData} />
    </div>
  );
};

export default Feature;
