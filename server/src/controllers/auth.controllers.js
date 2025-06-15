import User from "../models/users.models.js";
import generateAccessAndRefreshToken from "../utils/generatAccessRefreshToken.js";
import userVerification from "./verify.user.controllers.js";

const signUp = async (req, res) => {
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
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "Account already exists",
      });
    }
    const newUser = await User.create({
      email,
      fullName,
      password,
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      newUser._id
    );
    await userVerification(fullName, email);
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
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    res.clearCookie("jwt");
    res.cookie("jwt", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: loggedInUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
};

const logOut = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: "" },
      },
      { new: true }
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res.clearCookie("jwt", options);
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging out",
      error: error.message,
    });
  }
};

const gooleSingUpSignIn = async (req, res) => {
  const { fullName, email, profile_pic } = req.body;
  if (!fullName?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  if (!email?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user?._id
      );
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
      res.clearCookie("jwt");
      res.cookie("jwt", accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: loggedInUser,
      });
    }
    const generatedPassword = `${fullName.trim().slice(0, 5)}123`;
    const newUser = await User.create({
      email,
      fullName,
      password: generatedPassword,
      profile_pic: profile_pic || null,
      isVerified: true,
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
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
};

export { signUp, logIn, logOut, gooleSingUpSignIn };
