import { Router } from "express";
import { addNewDescriptionPoints, createPricing, getPlans } from "../controllers/pricing.controllers.js";
import uploadProfileImage from "../middlewares/uploadProfile.middlewares.js";

const pricingRouter = Router();

pricingRouter.route("/create").post(uploadProfileImage.single("icon"), createPricing);
pricingRouter.route("/add/new/:pricingID").patch(addNewDescriptionPoints);
pricingRouter.route("/plans").get(getPlans);

export default pricingRouter;
