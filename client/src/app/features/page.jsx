import React from "react";
import FeatuesHeroSection from "../Components/FeatuesHeroSection";
import Features from "../Components/Features";

const getFeaturesHeroSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feature/get/feature`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch feature hero section data");
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
      throw new Error("Failed to fetch features data");
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const Feature = async () => {
  const featuresHeroData = await getFeaturesHeroSectionData();
  const featuresData = await getFeaturesSectionData();

  return (
    <div>
      <FeatuesHeroSection featuresHeroData={featuresHeroData} />
      <Features featuresData={featuresData} />
    </div>
  );
};

export default Feature;
