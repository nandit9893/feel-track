import User from "../models/users.models.js";
import OTP from "../models/verify.user.otp.models.js";
import generateAccessAndRefreshToken from "../utils/generatAccessRefreshToken.js";
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
  const { fullName, email, otp, password } = req.body;

  if (!otp || !email || !fullName || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }
  try {
    const existingOTP = await OTP.findOne({ fullName, email, otp });
    if (!existingOTP) {
      return res.status(404).json({
        success: false,
        message: "The entered OTP is incorrect or does not exist.",
      });
    }
    const currentTime = new Date();
    if (existingOTP.expiresAt && existingOTP.expiresAt < currentTime) {
      await OTP.deleteOne({ _id: existingOTP._id });
      return res.status(410).json({
        success: false,
        message: "Your OTP has expired. Please request a new one.",
      });
    }
    if (existingOTP.otp !== parseInt(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }
    await OTP.deleteOne({ _id: existingOTP._id });
    const newUser = await User.create({
      email,
      fullName,
      password,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      newUser._id
    );

    newUser.refreshToken = refreshToken;
    await newUser.save({ validateBeforeSave: false });
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );
    res.clearCookie("jwt");
    res.cookie("jwt", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    if (!newUser) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }
    newUser.isVerified = true;
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully. Account created successfully.",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export { requestOTP, verifyOTP };
