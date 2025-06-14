import mongoose from "mongoose";

const headerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "header",
      unique: true,
    },
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/dqzskp5s3/image/upload/v1749459597/feel-track_jltena.png",
    },
    middleMenuLinks: [
      {
        name: {
          type: String,
          unique: true,
        },
        url: {
          type: String,
          default: "/",
        },
      },
    ],
    rightMenuLinks: [
      {
        name: {
          type: String,
          unique: true,
        },
        url: {
          type: String,
          default: "/",
        },
      },
    ],
  },
  { timestamps: true }
);

const Header = mongoose.models.Header || mongoose.model("Header", headerSchema);

export { Header };
