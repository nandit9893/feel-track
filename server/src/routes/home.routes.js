import { Router } from "express";
import { aboutPlan, cta, features, getAboutPlan, getCta, getFeatures, getHero, getHowItWorks, hero, howItWorks } from "../controllers/home.controllers.js";
import uploadVideo from "../middlewares/upload.video.middlewares.js";
import uploadProfileImage from "../middlewares/uploadProfile.middlewares.js";

const homeRouter = Router();

homeRouter.route("/hero").post(uploadVideo.single("videoURL"), hero);
homeRouter.route("/hero").get(getHero);
homeRouter.route("/add/how/works").post(uploadProfileImage.single("imageURL"), howItWorks);
homeRouter.route("/get/how/works").get(getHowItWorks);
homeRouter.route("/add/features").post(uploadProfileImage.single("imageURL"), features);
homeRouter.route("/get/features").get(getFeatures);
homeRouter.route("/add/cta").post(uploadProfileImage.single("imageURL"), cta);
homeRouter.route("/get/cta").get(getCta);
homeRouter.route("/add/about/plan").post(uploadProfileImage.single("imageURL"), aboutPlan);
homeRouter.route("/get/about/plan").get(getAboutPlan);

export default homeRouter;
