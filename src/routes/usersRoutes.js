const express = require("express");

const usersController = require("../controllers/usersController");
const registerUsersValidateMiddleware = require("../middlewares/usersMiddlewares/registerUserValidateMiddleware");
const checkUserExistMiddleware = require("../middlewares/usersMiddlewares/checkUserAlreadyExistMiddleware");
const loginUsersValidateMiddleware = require("../middlewares/usersMiddlewares/loginUserValidateMiddleware");
const authorizeMiddleware = require("../middlewares/usersMiddlewares/authorizeMiddleware");

const usersRoute = express.Router();

usersRoute.post("/register",
  registerUsersValidateMiddleware,
  checkUserExistMiddleware,
  usersController.register,
);

usersRoute.post("/login",
  loginUsersValidateMiddleware,
  usersController.login,
);

usersRoute.post("/logout",
  authorizeMiddleware,
  usersController.logout,
)

module.exports = usersRoute;