import Video from "../models/Video.js";
import User from "../models/User.js";

export const UploadGet = (req, res) => {
  res.render("upload");
};

export const UploadPost = async (req, res) => {
  const _id = req.session.user._id;

  const fileUrl = req.file.path;
  const { title, description, keywords } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      keywords,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      message: error._message,
    });
  }
};

export const WatchGet = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  return res.render("watch", { video });
};

//video edit
export const EditGet = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("edit-video", { video });
};

export const EditPost = async (req, res) => {
  const { id } = req.params;
  const { title, description, keywords } = req.body;

  const video = await Video.exists({ _id: id });
  const {
    user: { _id },
  } = req.session;
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    keywords,
  });

  return res.redirect(`/video/${id}`);
};

//video delete
export const Delete = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndRemove(id);
  return res.redirect("/");
};
