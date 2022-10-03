import multer from "multer";
//??

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

export const AvatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const VideoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000,
  },
});
