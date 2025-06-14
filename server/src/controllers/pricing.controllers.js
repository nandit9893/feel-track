import Pricing from "../models/pricing.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPricing = async (req, res) => {
  try {
    const {
      planName,
      description,
      monthlyPrice,
      yearlyPrice,
      descriptionPoint,
    } = req.body;
    const icon = req.file?.path;

    if (!planName || !planName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Plan Name is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Plan description is required",
      });
    }

    if (
      monthlyPrice === undefined ||
      monthlyPrice === null ||
      isNaN(Number(monthlyPrice))
    ) {
      return res.status(400).json({
        success: false,
        message: "Monthly Price is required and must be a number",
      });
    }

    if (
      yearlyPrice === undefined ||
      yearlyPrice === null ||
      isNaN(Number(yearlyPrice))
    ) {
      return res.status(400).json({
        success: false,
        message: "Yearly Price is required and must be a number",
      });
    }

    if (!descriptionPoint || !descriptionPoint.trim()) {
      return res.status(400).json({
        success: false,
        message: "At least one description point is required",
      });
    }

    const existingPlan = await Pricing.findOne({ planName: planName.trim() });
    if (existingPlan) {
      return res.status(409).json({
        success: false,
        message: "Pricing with this name already exists",
      });
    }

    let iconURL = "";
    if (icon) {
      const uploadResult = await uploadOnCloudinary(icon);
      iconURL = uploadResult.url || uploadResult.secure_url;
    }

    const newPricing = new Pricing({
      planName: planName.trim(),
      description: description.trim(),
      monthlyPrice: Number(monthlyPrice),
      yearlyPrice: Number(yearlyPrice),
      descriptionPoints: [
        {
          description: descriptionPoint.trim(),
          imageURL: iconURL,
        },
      ],
    });

    await newPricing.save();
    return res.status(201).json({
      success: true,
      message: "Pricing plan created successfully",
      data: newPricing,
    });
  } catch (error) {
    console.error("Error creating pricing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const addNewDescriptionPoints = async (req, res) => {
  try {
    const { pricingID } = req.params;
    const { descriptionPoint } = req.body;

    if (!descriptionPoint || !descriptionPoint.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description point is required",
      });
    }

    const plan = await Pricing.findById(pricingID);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found",
      });
    }
    const existingImageURL =
      plan.descriptionPoints.length > 0
        ? plan.descriptionPoints[0].imageURL
        : "";
    const duplicate = plan.descriptionPoints.find(
      (dp) =>
        dp.description.toLowerCase().trim() ===
        descriptionPoint.toLowerCase().trim()
    );
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This description point already exists",
      });
    }
    plan.descriptionPoints.push({
      description: descriptionPoint.trim(),
      imageURL: existingImageURL,
    });

    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Description point added successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Error adding description point:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Pricing.find().sort({ createdAt: 1 });
    if (plans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No plans exist",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Pricing plans fetched successfully",
      data: plans,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { createPricing, addNewDescriptionPoints, getPlans };
