import mongoose from "mongoose";

const aboutHeroSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "about-hero",
      unique: true,
    },
    firstImageURL: {
      type: String,
    },
    secondImageURL: {
      type: String,
    },
    hero_heading_1: [
      {
        text: {
          type: String,
        },
      },
    ],
    hero_heading_2: [
      {
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const aboutTechStackSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "tech-stack",
      unique: true,
    },
    heading: {
      type: String,
      default: "Tech Stack",
    },
    stack_categories: [
      {
        name: { type: String },
        description_points: [
          {
            name: { type: String },
            icon: { type: String },
            description: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const AboutHero = mongoose.models.AboutHero || mongoose.model("AboutHero", aboutHeroSchema);
const AboutTechStack =
  mongoose.models.AboutTechStack || mongoose.model("AboutTechStack", aboutTechStackSchema);

export { AboutHero, AboutTechStack };
