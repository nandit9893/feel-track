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

const getCTASectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/get/cta`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cta section data");
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

const page = async () => {
  const homeHeroSectionData = await getHomeHeroSectinData();
  const howHomeItWorksData = await getHomeHowItWorksSectionData();
  const featuresData = await getFeaturesSectionData();
  const ctaData = await getCTASectionData();
  const aboutPlanData = await getAboutPlanSectionData();

  return (
    <div>
      <AdminDashboard
        ctaData={ctaData}
        homeHeroSectionData={homeHeroSectionData}
        howHomeItWorksData={howHomeItWorksData}
        featuresData={featuresData}
        aboutPlanData={aboutPlanData}
      />
    </div>
  );
};

export default page;
