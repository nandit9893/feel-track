import { AboutHero } from "../models/about.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const aboutHero = async (req, res) => {
  try {
    const { hero_heading_1, hero_heading_2 } = req.body;
    const firstImageFile = req.files?.firstImageURL?.[0];
    const secondImageFile = req.files?.secondImageURL?.[0];
    let existingHero = await AboutHero.findOne({ type: "about-hero" });
    if (!existingHero) {
      existingHero = new AboutHero({ type: "about-hero" });
    }
    if (firstImageFile) {
      if (existingHero.firstImageURL) {
        await deleteFromCloudinary(existingHero.firstImageURL);
      }
      const uploadedFirstImage = await uploadOnCloudinary(firstImageFile.path);
      existingHero.firstImageURL = uploadedFirstImage.url;
    }
    if (secondImageFile) {
      if (existingHero.secondImageURL) {
        await deleteFromCloudinary(existingHero.secondImageURL);
      }
      const uploadedSecondImage = await uploadOnCloudinary(
        secondImageFile.path
      );
      existingHero.secondImageURL = uploadedSecondImage.url;
    }
    if (hero_heading_1) {
      const newHeading1 = { text: hero_heading_1 };
      if (
        existingHero.hero_heading_1 &&
        Array.isArray(existingHero.hero_heading_1)
      ) {
        existingHero.hero_heading_1.push(newHeading1);
      } else {
        existingHero.hero_heading_1 = [newHeading1];
      }
    }
    if (hero_heading_2) {
      const newHeading2 = { text: hero_heading_2 };
      if (
        existingHero.hero_heading_2 &&
        Array.isArray(existingHero.hero_heading_2)
      ) {
        existingHero.hero_heading_2.push(newHeading2);
      } else {
        existingHero.hero_heading_2 = [newHeading2];
      }
    }
    await existingHero.save();
    return res.status(200).json({
      success: true,
      message: "Hero section updated successfully",
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

const getAboutHero = async (req, res) => {
  try {
    const aboutHero = await AboutHero.findOne({ type: "about-hero" });
    if (!aboutHero) {
      return res.status(404).json({
        success: false,
        message: "About hero section not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "About hero section fetched successfully",
      data: aboutHero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the about hero section",
      error: error.message,
    });
  }
};

const aboutTechStack = async (req, res) => {};

const getAboutTechStack = async (req, res) => {};

export { aboutHero, getAboutHero, aboutTechStack, getAboutTechStack };
