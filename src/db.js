import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const handleOpen = () => {
  console.log("@ Connect to DB @");
};

const db = mongoose.connection;
db.on("error", (error) => console.log("DB error", error));
db.once("open", handleOpen);
