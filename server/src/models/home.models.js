import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "hero",
      unique: true,
    },
    videoURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dqzskp5s3/video/upload/v1749796760/hero-section_ykzpfm.mp4",
    },
    heading: {
      type: String,
      default: "Welcome to FeelTrack",
    },
    description: {
      type: String,
      default:
        "Emotion-driven personalized music recommendations for your mood.",
    },
    button: {
      title: {
        type: String,
        default: "Get Started",
      },
      url: {
        type: String,
        default: "/",
      },
    },
  },
  { timestamps: true }
);

const howItWorksSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "how-it-works",
      unique: true,
    },
    heading: {
      type: String,
      default: "How it works?",
    },
    steps: [
      {
        heading: String,
        description: String,
        imageURL: String,
      },
    ],
  },
  { timestamps: true }
);

const featureSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "features",
      unique: true,
    },
    heading: {
      type: String,
      default: "Features",
    },
    features: [
      {
        title: String,
        description: String,
        imageURL: String,
      },
    ],
  },
  { timestamps: true }
);

const ctaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "call-to-action",
      unique: true,
    },
    heading: String,
    button: {
      title: String,
      url: String,
    },
    imageURL: String,
  },
  { timestamps: true }
);

const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
const HowItWorks =
  mongoose.models.HowItWorks || mongoose.model("HowItWorks", howItWorksSchema);
const Feature =
  mongoose.models.Feature || mongoose.model("Feature", featureSchema);
const CTA = mongoose.models.CTA || mongoose.model("CTA", ctaSchema);

export { Hero, HowItWorks, Feature, CTA };
