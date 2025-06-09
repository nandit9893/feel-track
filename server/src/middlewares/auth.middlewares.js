import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import APIError from "../utils/APIError.js";

const verifyUserJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json(new APIError(401, "Access denied. No token provided."));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res
        .status(401)
        .json(new APIError(401, "Access denied. User not found."));
    }
    req.user = user;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Access denied. Token has expired."
        : "Access denied. Invalid token.";
    return res.status(401).json(new APIError(401, message));
  }
};

export default verifyUserJWT;
