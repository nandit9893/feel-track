import { Header } from "../models/web.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const addHeaderData = async (req, res) => {
  try {
    const { middleMenuName, middleMenuURL, rightMenuName, rightMenuURL } =
      req.body;
    const logo = req.file?.path;
    let existingHeader = await Header.findOne({ type: "header" });
    if (!existingHeader) {
      existingHeader = new Header({
        type: "header",
        middleMenuLinks: [],
        rightMenuLinks: [],
      });
    }
    if (logo) {
      if (existingHeader.logo && existingHeader.logo !== "") {
        await deleteFromCloudinary(existingHeader.logo);
      }
      const uploadedResult = await uploadOnCloudinary(logo);
      existingHeader.logo = uploadedResult?.url || uploadedResult?.secure_url;
    }
    if (middleMenuName) {
      const alreadyExists = existingHeader.middleMenuLinks.some(
        (item) => item.name.toLowerCase() === middleMenuName.toLowerCase()
      );
      if (alreadyExists) {
        return res.status(409).json({
          success: false,
          message: `Middle menu item "${middleMenuName}" already exists.`,
        });
      }
      existingHeader.middleMenuLinks.push({
        name: middleMenuName,
        url: middleMenuURL || "/",
      });
    }
    if (rightMenuName) {
      const alreadyExists = existingHeader.rightMenuLinks.some(
        (item) => item.name.toLowerCase() === rightMenuName.toLowerCase()
      );
      if (alreadyExists) {
        return res.status(409).json({
          success: false,
          message: `Right menu item "${rightMenuName}" already exists.`,
        });
      }
      existingHeader.rightMenuLinks.push({
        name: rightMenuName,
        url: rightMenuURL || "/",
      });
    }
    await existingHeader.save();
    return res.status(200).json({
      success: true,
      message: "Header data saved/updated successfully.",
      data: existingHeader,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getHeaderData = async (req, res) => {
  try {
    const header = await Header.findOne({ type: "header" });
    if (!header) {
      return res.status(404).json({
        success: false,
        message: "Header data not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Header data fetched successfully.",
      data: header,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const addFooterData = async (req, res) => {};

const getFooterData = async (req, res) => {};

export { addFooterData, addHeaderData, getFooterData, getHeaderData };
