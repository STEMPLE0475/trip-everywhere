import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: "String", required: "true" },
  description: { type: "String", required: "true" },
  keywords: { type: "String", required: "true" },
  fileUrl: { type: "String", required: "true" },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
