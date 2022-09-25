import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import "./db.js";
import "./models/User.js";

const PORT = "4000";
const app = express();
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

app.listen(PORT, console.log(`@ Server Starting In Port ${PORT} @`));
//
