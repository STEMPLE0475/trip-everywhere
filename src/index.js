import "dotenv/config";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js";
import "./models/User.js";
import { localsMiddleware } from "./middlewares.js";

const PORT = "4000";
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(
  session({
    secret: "secrrreeet",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

app.listen(PORT, console.log(`@ Server Starting In Port ${PORT} @`));
//
