const express = require("express");

const usersController = require("../controllers/usersController");
const authorizeMiddleware = require("../middlewares/usersMiddlewares/authorizeMiddleware");
const updateSubscriptionUserMiddleware = require("../middlewares/usersMiddlewares/updateSubscriptionUserMiddleware");
const imageUploadMiddleware = require("../middlewares/usersMiddlewares/imageStorageMiddleware");
const imageMinifyMiddleware = require("../middlewares/usersMiddlewares/imageMinifyMiddleware");

const usersRoute = express.Router();

usersRoute.get("/current",
  authorizeMiddleware,
  usersController.getCurrentUser,
);

usersRoute.patch("/",
  authorizeMiddleware,
  updateSubscriptionUserMiddleware,
  usersController.updateUser,
);

usersRoute.patch("/avatars",
  authorizeMiddleware,
  imageUploadMiddleware.single("avatar"),
  imageMinifyMiddleware,
  usersController.updateAvatar,
)

module.exports = usersRoute;