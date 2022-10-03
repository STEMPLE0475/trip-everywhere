import express from "express";
import {
  UploadGet,
  UploadPost,
  EditGet,
  EditPost,
  Delete,
  WatchGet,
} from "../controllers/videoController.js";
import { VideoUpload } from "../middlewares.js";
const videoRouter = express.Router();

videoRouter.route(":/id").get(WatchGet);
videoRouter.route(":/id/edit").get(EditGet).post(EditPost);
videoRouter.route(":/id/delete").get(Delete);
videoRouter
  .route("/upload")
  .get(UploadGet)
  .post(VideoUpload.single("video"), UploadPost);

export default videoRouter;
