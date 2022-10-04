import express from "express";
import {
  UploadGet,
  UploadPost,
  EditGet,
  EditPost,
  Delete,
  WatchGet,
} from "../controllers/videoController.js";
import { protectorMiddleware, VideoUpload } from "../middlewares.js";

const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-f]{24})").all(protectorMiddleware).get(WatchGet);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(EditGet)
  .post(EditPost);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(Delete);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(UploadGet)
  .post(VideoUpload.single("video"), UploadPost);

export default videoRouter;
