const express = require("express");

const usersController = require("../controllers/usersController");
const registerUsersValidateMiddleware = require("../middlewares/usersMiddlewares/registerUserValidateMiddleware");
const checkUserExistMiddleware = require("../middlewares/usersMiddlewares/checkUserAlreadyExistMiddleware");

const usersRoute = express.Router();

usersRoute.post("/register",
  registerUsersValidateMiddleware,
  checkUserExistMiddleware,
  usersController.register,
);

module.exports = usersRoute;