import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    songUrl: {
      type: String,
      required: true,
    },
    emotionTags: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
