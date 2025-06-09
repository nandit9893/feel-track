import mongoose from "mongoose";

const songRecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emotionScanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmotionScan",
      required: true,
    },
    songs_recommended: {
      type: [
        {
          songId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song",
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const SongRecommendation = mongoose.model("SongRecommendation", songRecommendationSchema);

export default SongRecommendation;
