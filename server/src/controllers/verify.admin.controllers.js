import nodemailer from "nodemailer";
import Admin from "../models/admin.models.js";
import admin_verification_template from "../utils/templates/admin.verification.templates.js";
import { generatAccessRefreshTokenAdmin } from "../utils/generatAccessRefreshToken.js";

const adminVerification = async (fullName, email, role) => {
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
    const updatedAdmin = await Admin.findOneAndUpdate(
      { email, role },
      {
        otp: verificationCode,
        otpCreatedAt: new Date(),
      },
      { new: true }
    );
    if (!updatedAdmin) {
      throw new Error("Admin not found for verification.");
    }
    const mailOptions = {
      from: `"Feel Track" <${process.env.NODE_MAILER_USER}>`,
      to: email,
      subject: "Admin Account Verification",
      text: `Hello ${fullName},\n\nThis is your verification OTP:\n\n${verificationCode}\n\nIt is valid for 5 minutes.`,
      html: admin_verification_template(fullName, verificationCode, role),
    };
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyAdminOTP = async (req, res) => {
  const { fullName, email, otp, role } = req.body;
  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({
      success: false,
      message: "Full Name is required",
    });
  }
  if (!otp || !otp.trim()) {
    return res.status(400).json({
      success: false,
      message: "OTP is required",
    });
  }
  if (!role || !role.trim()) {
    return res.status(400).json({
      success: false,
      message: "Role is required",
    });
  }
  try {
    const admin = await Admin.findOne({ fullName, email, role });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }
    if (!admin.otp || !admin.otpCreatedAt) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }
    const currentTime = new Date();
    const otpExpiryTime = new Date(admin.otpCreatedAt.getTime() + 5 * 60000);
    if (currentTime > otpExpiryTime) {
      admin.otp = "";
      admin.otpCreatedAt = null;
      await admin.save();
      return res.status(410).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }
    if (admin.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }
    admin.otp = "";
    admin.otpCreatedAt = null;
    const { accessToken, refreshToken } = await generatAccessRefreshTokenAdmin(
      admin._id
    );
    admin.refreshToken = refreshToken;
    await admin.save();
    res.clearCookie("jwt");
    res.cookie("jwt", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    const loggedInAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken -otp"
    );
    return res.status(200).json({
      success: true,
      message: "OTP verified. Login successful.",
      data: loggedInAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export { adminVerification, verifyAdminOTP };
