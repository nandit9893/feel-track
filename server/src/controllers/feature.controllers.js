import { FeatureHero } from "../models/features.models.js";

const featureHero = async (req, res) => {
  try {
    const { heading, description } = req.body;
    let featureHero = await FeatureHero.findOne({ type: "feature-hero" });
    if (!featureHero) {
      featureHero = new FeatureHero({ type: "feature-hero" });
    }
    let isUpdated = false;
    if (heading && typeof heading === "string" && heading.trim() !== "") {
      featureHero.heading = heading.trim();
      isUpdated = true;
    }
    if (
      description &&
      typeof description === "string" &&
      description.trim() !== ""
    ) {
      featureHero.description = description.trim();
      isUpdated = true;
    }
    if (isUpdated) {
      await featureHero.save();
    }
    return res.status(200).json({
      success: true,
      message: "Feature hero updated successfully",
      data: featureHero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the hero section",
      error: error.message,
    });
  }
};

const getFeatureHero = async (req, res) => {
  try {
    const featureHero = await FeatureHero.findOne({ type: "feature-hero" });
    if (!featureHero) {
      return res.status(404).json({
        success: false,
        message: "Feature hero not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Feature hero fetched successfully",
      data: featureHero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the hero section",
      error: error.message,
    });
  }
};

export { featureHero, getFeatureHero };
