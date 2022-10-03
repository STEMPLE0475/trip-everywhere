import express from "express";
import {
  Home,
  RegisterGet,
  RegisterPost,
  LoginGet,
  LoginPost,
} from "../controllers/globalController.js";

const globalRouter = express.Router();

globalRouter.get("/", Home);
globalRouter.route("/register").get(RegisterGet).post(RegisterPost);
globalRouter.route("/login").get(LoginGet).post(LoginPost);

export default globalRouter;
