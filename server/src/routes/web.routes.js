import { Router } from "express";
import { addFooterData,  addHeaderData,  getFooterData,  getHeaderData } from "../controllers/web.controllers.js";
import uploadProfileImage from "../middlewares/uploadProfile.middlewares.js";

const webRouter = Router();

webRouter.route("/add/header").post(uploadProfileImage.single("logo"), addHeaderData);
webRouter.route("/get/header").get(getHeaderData);
webRouter.route("/add/footer").post(addFooterData);
webRouter.route("/get/footer").get(getFooterData);

export default webRouter;
