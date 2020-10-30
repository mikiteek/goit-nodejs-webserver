const express = require("express");

const usersController = require("../controllers/usersController");
const authorizeMiddleware = require("../middlewares/usersMiddlewares/authorizeMiddleware");
const updateSubscriptionUserMiddleware = require("../middlewares/usersMiddlewares/updateSubscriptionUserMiddleware");

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

module.exports = usersRoute;