import express from "express";
import { Home } from "../controllers/globalController.js";

const globalRouter = express.Router();

globalRouter.get("/", Home);

export default globalRouter;
