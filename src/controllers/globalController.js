import User from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcrypt";

export const Home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { videos });
};

export const RegisterGet = (req, res) => {
  res.render("register");
};

export const RegisterPost = async (req, res) => {
  const { email, username, password, name } = req.body;
  await User.create({ email, username, password, name });
  return res.redirect("/login");
};

export const LoginGet = (req, res) => {
  res.render("login");
};

export const LoginPost = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      message: "An account with this username does not exists",
    });
  }

  //is password right?
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    console.log("Wrong password");
    return res.redirect("/login");
  }
  //session - is logined?
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

//video search
export const Search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { videos });
};
