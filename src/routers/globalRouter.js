import express from "express";
import {
  Home,
  RegisterGet,
  RegisterPost,
  LoginGet,
  LoginPost,
  Search,
} from "../controllers/globalController.js";
import { publicOnlyMiddleware } from "../middlewares.js";

const globalRouter = express.Router();

globalRouter.get("/", Home);
globalRouter
  .route("/register")
  .all(publicOnlyMiddleware)
  .get(RegisterGet)
  .post(RegisterPost);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(LoginGet)
  .post(LoginPost);
globalRouter.route("/search").get(Search);
export default globalRouter;
