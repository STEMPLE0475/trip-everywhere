import express from "express";
import Video from "../models/Video.js";

export const UploadGet = (req, res) => {
  res.render("upload");
};

export const UploadPost = async (req, res) => {
  const file = req.file;
  const { title, description, keywords } = req.body;
  try {
    await Video.create({
      title,
      description,
      fileUrl: file.path,
      keywords,
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload");
  }
};

export const WatchGet = (req, res) => {
  res.end();
};

export const EditGet = (req, res) => {
  res.end();
};

export const EditPost = (req, res) => {
  res.end();
};

export const Delete = (req, res) => {
  res.end();
};
