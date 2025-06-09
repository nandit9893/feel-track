import mongoose from "mongoose";

const emotionScanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emotion: {
      type: String,
      required: true,
    },
    diaryEntry: {
      type: String,
      required: true,
    },
    scanImageUrl: {
      type: String,
      required: true,
    },
    emotionTags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EmotionScan = mongoose.model("EmotionScan", emotionScanSchema);

export default EmotionScan;
