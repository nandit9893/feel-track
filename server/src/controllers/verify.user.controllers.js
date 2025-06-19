import nodemailer from "nodemailer";
import OTP from "../models/verify.user.otp.models.js";
import user_verification_template from "../utils/templates/user.verification.template.js";

const userVerification = async (fullName, email) => {
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
    const otpEntry = new OTP({
      otp: verificationCode,
      email,
      fullName,
    });
    await otpEntry.save();
    const mailOptions = {
      from: `"Feel Track" <${process.env.NODE_MAILER_USER}>`,
      to: email,
      subject: "Verification",
      text: `Hello ${fullName},\n\nThis is the OTP for verification, valid for 5 minutes only:\n\n${verificationCode}`,
      html: user_verification_template(fullName, verificationCode),
    };
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};


export default userVerification;
