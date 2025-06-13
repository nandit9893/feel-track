import React from "react";
import AboutHeroSection from "../Components/AboutHeroSection";
import TechStack from "../Components/TechStack";
import CTASection from "../Components/CTASection";

const getAboutHeroSectinData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/about/get/hero`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to about hero data");
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
      throw new Error(
        `Failed to fetch CTA data: ${response.status} ${response.statusText}`
      );
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
      throw new Error(
        `Failed to fetch CTA data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const AboutPage = async () => {
  const heroData = await getAboutHeroSectinData();
  const ctaData = await getCTASectionData();
  const aboutPlanData = await getAboutPlanSectionData();

  return (
    <div>
      <AboutHeroSection heroData={heroData} />
      <TechStack />
      <CTASection ctaData={ctaData} aboutPlanData={aboutPlanData} />
    </div>
  );
};

export default AboutPage;
