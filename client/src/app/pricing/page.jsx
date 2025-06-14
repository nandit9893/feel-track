import React from "react";
import Pricing from "./Pricing";

const getPricingSectionData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pricing/plans`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch CTA data pricing section data`);
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

const page = async () => {
  const pricingData = await getPricingSectionData();

  return (
    <div>
      <Pricing pricingData={pricingData} />
    </div>
  );
};

export default page;
