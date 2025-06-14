import { Router } from "express";
import uploadHeroImages from "../middlewares/upload.hero.about.middlewares.js";
import { aboutHero, aboutTechStack, getAboutHero, getAboutTechStack } from "../controllers/about.controllers.js";
import uploadProfileImage from "../middlewares/uploadProfile.middlewares.js";

const aboutRouter = Router();

aboutRouter.route("/add/hero").post(uploadHeroImages, aboutHero);
aboutRouter.route("/get/hero").get(getAboutHero);
aboutRouter.route("/add/tech").post(uploadProfileImage.single("icon"), aboutTechStack);
aboutRouter.route("/get/tech").get(getAboutTechStack);

export default aboutRouter;
