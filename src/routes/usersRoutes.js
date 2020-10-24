const express = require("express");

const registerUsersValidateMiddleware = require("../middlewares/usersMiddlewares/registerUserValidateMiddleware");

const usersRoute = express.Router();

usersRoute.post("/register",
  registerUsersValidateMiddleware,

);

module.exports = usersRoute;