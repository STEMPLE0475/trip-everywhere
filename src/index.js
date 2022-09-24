import express from "express";
import morgan from "morgan";

const PORT = "4000";

const app = express();

app.use(morgan("dev"));
app.get("/");

app.listen(PORT, console.log(`@ Server Starting In Port ${PORT} @`));
//
