import Admin from "../models/admin.models.js";
import { adminVerification } from "./verify.admin.controllers.js";

const createAdminUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }
  try {
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const newAdmin = await Admin.create({
      email,
      fullName,
      password,
      role: "admin",
    });
    const createdAdmin = await Admin.findById(newAdmin._id).select("-password");
    return res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      data: createdAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the admin",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }
  if (!role || !role.trim()) {
    return res.status(400).json({
      success: false,
      message: "Role is required",
    });
  }

  try {
    const admin = await Admin.findOne({ email, role });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found with this role",
      });
    }
    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    await adminVerification(admin.fullName, email, role);
    const sendAdminData = await Admin.findOne({ email, role }).select("-password -otp -refreshToken -otpCreatedAt");
    return res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete login.",
      data: sendAdminData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
};

export { createAdminUser, loginAdmin };
