const express = require("express");

const usersController = require("../controllers/usersController");
const registerUsersValidateMiddleware = require("../middlewares/usersMiddlewares/registerUserValidateMiddleware");
const checkUserExistMiddleware = require("../middlewares/usersMiddlewares/checkUserAlreadyExistMiddleware");
const loginUsersValidateMiddleware = require("../middlewares/usersMiddlewares/loginUserValidateMiddleware");
const authorizeMiddleware = require("../middlewares/usersMiddlewares/authorizeMiddleware");
const createAvatarMiddleware = require("../middlewares/usersMiddlewares/createAvatarMiddleware");

const authRoute = express.Router();

authRoute.post("/register",
  registerUsersValidateMiddleware,
  checkUserExistMiddleware,
  createAvatarMiddleware,
  usersController.register,
);

authRoute.post("/login",
  loginUsersValidateMiddleware,
  usersController.login,
);

authRoute.post("/logout",
  authorizeMiddleware,
  usersController.logout,
);

module.exports = authRoute;