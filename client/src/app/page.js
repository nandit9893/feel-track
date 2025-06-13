import React from "react";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import Features from "./Components/Features";
import LiveDemo from "./Components/LiveDemo";
import Testimonials from "./Components/Testimonials ";
import CTASection from "./Components/CTASection";

const getHeroSectinData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/hero`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching home hero section", error);
    return [];
  }
};

const getHowItWorksSectionData = async () => {
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
    console.error("Error fetching how it works section", error);
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
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching features section", error);
    return [];
  }
};

const page = async () => {
  const heroData = await getHeroSectinData();
  const howItWorksData = await getHowItWorksSectionData();
  const featuresData = await getFeaturesSectionData();

  return (
    <div>
      <HeroSection heroData={heroData} />
      <HowItWorks howItWorksData={howItWorksData} />
      <Features featuresData={featuresData} />
      <LiveDemo />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default page;
