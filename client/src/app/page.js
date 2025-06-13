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
    return [];
  }
};

const getCTASectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/get/cta`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch CTA data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const getAboutPlanSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/get/about/plan`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch CTA data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const page = async () => {
  const heroData = await getHeroSectinData();
  const howItWorksData = await getHowItWorksSectionData();
  const featuresData = await getFeaturesSectionData();
  const ctaData = await getCTASectionData();
  const aboutPlanData = await getAboutPlanSectionData();

  return (
    <div>
      <HeroSection heroData={heroData} />
      <HowItWorks howItWorksData={howItWorksData} />
      <Features featuresData={featuresData} />
      <LiveDemo />
      <Testimonials />
      <CTASection ctaData={ctaData} aboutPlanData={aboutPlanData} />
    </div>
  );
};

export default page;