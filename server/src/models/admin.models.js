import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
    },
    otpCreatedAt: {
      type: Date,
      default: Date.now,
      expires: 300,
    },
    password: {
      type: String,
      required: true,
    },
    voiceURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
