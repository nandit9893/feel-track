import { Router } from "express";
import { logIn, logOut, signUp } from "../controllers/auth.controllers.js";
import uploadProfileImage from "../middlewares/uploadProfile.middlewares.js";
import { requestOTP, verifyOTP } from "../controllers/otp.controllers.js";
import verifyUserJWT from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.route("/signup").post(uploadProfileImage.single("profile_pic"), signUp);
authRouter.route("/login").post(logIn);
authRouter.route("/logout").post(verifyUserJWT, logOut);
authRouter.route("/request/otp").post(requestOTP);
authRouter.route("/verify/otp").post(verifyOTP);

export default authRouter;
