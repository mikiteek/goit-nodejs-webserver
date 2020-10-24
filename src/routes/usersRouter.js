const express = require("express");

const usersController = require("../controllers/usersController");
const authorizeMiddleware = require("../middlewares/usersMiddlewares/authorizeMiddleware");

const usersRoute = express.Router();

usersRoute.get("/current",
  authorizeMiddleware,
  usersController.getCurrentUser,
)

module.exports = usersRoute;