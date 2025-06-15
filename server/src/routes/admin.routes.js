import { Router } from "express";
import { createAdminUser, loginAdmin } from "../controllers/admin.controllers.js";
import verifyAdminJWT from "../middlewares/admin.auth.middlewares.js";
import { verifyAdminOTP } from "../controllers/verify.admin.controllers.js";

const adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/create").post(verifyAdminJWT, createAdminUser);
adminRouter.route("/verify").post(verifyAdminOTP);

export default adminRouter;
