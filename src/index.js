import "dotenv/config";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./models/User.js";
import "./models/Video.js";
import "./db.js";
import "./models/User.js";
import { localsMiddleware } from "./middlewares.js";

//server setting
const PORT = "4000";
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
//upload - Static Files
app.use("/uploads", express.static("uploads"));

//session with MongoDB
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
//session middleware
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

//Middleware and Router
app.use(localsMiddleware);
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

//server Port
app.listen(PORT, console.log(`@ Server Starting In Port ${PORT} @`));
