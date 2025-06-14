import mongoose from "mongoose";

const featureHeroSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "feature-hero",
      unique: true,
    },
    heading: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const FeatureHero = mongoose.models.FeatureHero || mongoose.model("FeatureHero", featureHeroSchema);

export { FeatureHero };
