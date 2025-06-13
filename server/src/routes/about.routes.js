import { Router } from "express";

import uploadHeroImages from "../middlewares/upload.hero.about.middlewares.js";
import { aboutHero, getAboutHero, getAboutTechStack } from "../controllers/about.controllers.js";

const aboutRouter = Router();

aboutRouter.route("/add/hero").post(uploadHeroImages, aboutHero);
aboutRouter.route("/get/hero").get(getAboutHero);
aboutRouter.route("/get/about").get(getAboutTechStack);

export default aboutRouter;
