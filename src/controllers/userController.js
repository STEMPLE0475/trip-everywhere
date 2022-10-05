import express, { response } from "express";
import { render } from "pug";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const Logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

//edit user
export const EditGet = (req, res) => {
  res.render("edit-profile");
};

export const EditPost = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username },
  } = req;
  await User.findByIdAndUpdate(_id, { name, email, username });
  req.session.user = {
    ...req.session.user,
    name,
    email,
    username,
  };
  return res.redirect("/user/edit");
};

//change password
export const ChangePasswordGet = (req, res) => {
  return res.render("change-password");
};
export const ChangePasswordPost = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    return res.render("change-password", {
      message: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.render("change-password", {
      message: "The password does not match the confirmation",
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/user/logout");
};

//Profile = See
export const Profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  return res.render("profile", { user });
};
