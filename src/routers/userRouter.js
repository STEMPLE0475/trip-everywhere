import express from "express";
import {
  Logout,
  EditGet,
  EditPost,
  ChangePasswordPost,
  ChangePasswordGet,
  Profile,
} from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

const userRouter = express.Router();

userRouter.route("/logout").get(protectorMiddleware, Logout);
userRouter.route("/edit").all(protectorMiddleware).get(EditGet).post(EditPost);
// userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
// userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(ChangePasswordGet)
  .post(ChangePasswordPost);

userRouter.get("/:id", Profile);

export default userRouter;
