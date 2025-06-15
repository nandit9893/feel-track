import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";
import Admin from "../models/admin.models.js";

const verifyAdminJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json(new APIError(401, "Access denied. No token provided."));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const admin = await Admin.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!admin) {
      return res
        .status(401)
        .json(new APIError(401, "Access denied. User not found."));
    }
    req.admin = admin;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Access denied. Token has expired."
        : "Access denied. Invalid token.";
    return res.status(401).json(new APIError(401, message));
  }
};

export default verifyAdminJWT;
