import { Feature, Hero, HowItWorks } from "../models/home.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const hero = async (req, res) => {
  try {
    const { heading, description, title, url } = req.body;
    const videoLocalPath = req.file?.path;
    let existingHero = await Hero.findOne({ type: "hero" });
    if (!existingHero) {
      existingHero = new Hero({ type: "hero" });
    }
    if (heading) existingHero.heading = heading;
    if (description) existingHero.description = description;
    if (title) existingHero.button.title = title;
    if (url) existingHero.button.url = url;
    if (videoLocalPath) {
      if (existingHero.videoURL) {
        await deleteFromCloudinary(existingHero.videoURL);
      }
      const uploadResult = await uploadOnCloudinary(videoLocalPath, "video");
      existingHero.videoURL = uploadResult.secure_url || uploadResult.url;
    }
    await existingHero.save();
    return res.status(200).json({
      success: true,
      message: "Hero section saved successfully",
      data: existingHero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the hero section",
      error: error.message,
    });
  }
};

const getHero = async (req, res) => {
  try {
    const heroData = await Hero.findOne({ type: "hero" });
    if (!heroData) {
      const defaultHero = new Hero({ type: "hero" });
      await defaultHero.save();
      return res.status(200).json({
        success: true,
        data: defaultHero,
        message: "Hero section fetched successfully",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Hero section fetched successfully",
      data: heroData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the hero section",
      error: error.message,
    });
  }
};

const howItWorks = async (req, res) => {
  try {
    const { heading, stepHeading, description } = req.body;
    const imageLocalPath = req.file?.path;
    let existingHowItWorks = await HowItWorks.findOne({ type: "how-it-works" });
    if (!existingHowItWorks) {
      existingHowItWorks = new HowItWorks({ type: "how-it-works" });
    }
    if (heading) existingHowItWorks.heading = heading;
    if (stepHeading && description) {
      let imageURL = "";
      if (imageLocalPath) {
        const uploadResult = await uploadOnCloudinary(imageLocalPath);
        imageURL = uploadResult.secure_url || uploadResult.url;
      }
      const newStep = {
        heading: stepHeading,
        description,
        imageURL,
      };
      existingHowItWorks.steps.push(newStep);
    }
    await existingHowItWorks.save();
    return res.status(200).json({
      success: true,
      message: "How It Works section added successfully",
      data: existingHowItWorks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update How It Works section",
      error: error.message,
    });
  }
};

const getHowItWorks = async (req, res) => {
  try {
    const howItWorksData = await HowItWorks.findOne({ type: "how-it-works" });
    if (!howItWorksData) {
      return res.status(404).json({
        success: false,
        message: "How It Works section not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "How It Works section fetched successfully",
      data: howItWorksData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch How It Works section",
      error: error.message,
    });
  }
};

const features = async (req, res) => {
  try {
    const { heading, title, description } = req.body;
    const imageLocalPath = req.file?.path;
    let existingFeatures = await Feature.findOne({ type: "features" });
    if (!existingFeatures) {
      existingFeatures = new Feature({ type: "features" });
    }
    if (heading) existingFeatures.heading = heading;
    if (title && description) {
      let imageURL = "";
      if (imageLocalPath) {
        const uploadResult = await uploadOnCloudinary(imageLocalPath);
        imageURL = uploadResult.secure_url || uploadResult.url;
      }
      const newFeature = {
        title,
        description,
        imageURL,
      };
      existingFeatures.features.push(newFeature);
    }
    await existingFeatures.save();
    return res.status(200).json({
      success: true,
      message: "Features section added successfully",
      data: existingFeatures,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Features section",
      error: error.message,
    });
  }
};

const getFeatures = async (req, res) => {
    try {
    const featuresData = await Feature.findOne({ type: "features" });
    if (!featuresData) {
      return res.status(404).json({
        success: false,
        message: "How It Works section not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Features section fetched successfully",
      data: featuresData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch features data",
      error: error.message,
    });
  }
}

const cta = async (req, res) => {};

export { hero, howItWorks, features, cta, getHero, getHowItWorks, getFeatures };
