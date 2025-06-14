import { Router } from "express";
import { featureHero, getFeatureHero } from "../controllers/feature.controllers.js";

const featureRouter = Router();

featureRouter.route("/add/feature").post(featureHero);
featureRouter.route("/get/feature").get(getFeatureHero);

export default featureRouter;
