const express = require("express");

const imagesRoute = express.Router();
const imageUploadMiddleware = require("../middlewares/usersMiddlewares/imageStorageMiddleware");

imagesRoute.post("/",
  imageUploadMiddleware.single("avatar"),
  (req, res, next) => {
    return res.status(200).json(req.file);
  }
);





module.exports = imagesRoute;