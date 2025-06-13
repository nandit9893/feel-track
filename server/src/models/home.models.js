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
    description: {
      type: String,
      default:
        "Feel your vibe, scan your soul, and let AI compose your soundtrack 🎧✨ — where emotion meets music, like never before.",
    },
    button: {
      title: {
        type: String,
        default: "Subcribe",
      },
      url: {
        type: String,
        default: "/",
      },
    },
    imageURL: String,
  },
  { timestamps: true }
);

const aboutPlanSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "about-plan",
      unique: true,
    },
    heading: {
      firstSubHeading: {
        type: String,
        default: "Ready to tune your mind with",
      },
      secondSubHeading: {
        type: String,
        default: "Music Therapy?",
      },
    },
    description: {
      type: String,
      default:
        "Experience calm, focus, and emotional clarity with personalized music therapy. Let AI analyze your mood and recommend tracks thathelp you heal, reflect, and thrive.",
    },
    button: {
      title: {
        type: String,
        default: "Start Your Journey",
      },
      subheading: {
        type: String,
        default: "Cancel anytime. No stress, just harmony.",
      },
      url: {
        type: String,
        default: "/",
      },
      imageURL: String,
    },
    descriptionPoints: [
      {
        imageURL: String,
        title: String,
      },
    ],
    imageURL: String,
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
const HowItWorks =
  mongoose.models.HowItWorks || mongoose.model("HowItWorks", howItWorksSchema);
const Feature =
  mongoose.models.Feature || mongoose.model("Feature", featureSchema);
const CTA = mongoose.models.CTA || mongoose.model("CTA", ctaSchema);
const AboutPlan =
  mongoose.models.AboutPlan || mongoose.model("AboutPlan", aboutPlanSchema);

export { Hero, HowItWorks, Feature, CTA, AboutPlan };
