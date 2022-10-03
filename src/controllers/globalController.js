import User from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcrypt";

export const Home = (req, res) => {
  res.render("home");
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
    console.log("An account with this username does not exists");
    return res.redirect("/login");
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    console.log("Wrong password");
    return res.redirect("/login");
  }
  //session
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
