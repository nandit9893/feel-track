import User from "../models/users.models.js";
import OTP from "../models/verify.user.otp.models.js";
import userVerification from "./verify.user.controllers.js";

const requestOTP = async (req, res) => {
  const { fullName, email } = req.body;
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
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist with this email",
      });
    }
    const response = await userVerification(fullName, email);
    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while sending OTP",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { fullName, email, otp } = req.body;
  if (!otp || !email || !fullName) {
    return res.status(400).json({
      success: false,
      message: "OTP, Name, and email are required.",
    });
  }
  try {
    const existingOTP = await OTP.findOne({
      fullName,
      email,
      otp,
    });
    if (!existingOTP) {
      return res.status(404).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
    }
    const currentTime = new Date();
    if (existingOTP.expiresAt && existingOTP.expiresAt < currentTime) {
      await OTP.deleteOne({ _id: existingOTP._id });
      return res.status(410).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }
    if (existingOTP.otp === parseInt(otp)) {
      await OTP.deleteOne({ _id: existingOTP._id });
      const user = await User.findOne({ email });
      user.isVerified = true;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "OTP verification successful.",
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export { requestOTP, verifyOTP };
