import mongoose from "mongoose";

const customizedSongSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
    recommendationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SongRecommendation",
    },
    voiceType: {
      type: String,
      enum: ["original", "custom"],
      required: true,
    },
    customSinger: {
      type: String,
      required: function () {
        return this.voiceType === "custom";
      },
    },
    generatedSongUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CustomizedSong = mongoose.model("CustomizedSong", customizedSongSchema);

export default CustomizedSong;
