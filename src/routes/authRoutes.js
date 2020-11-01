const express = require("express");

const usersController = require("../controllers/usersController");
const registerUsersValidateMiddleware = require("../middlewares/usersMiddlewares/registerUserValidateMiddleware");
const checkUserExistMiddleware = require("../middlewares/usersMiddlewares/checkUserAlreadyExistMiddleware");
const loginUsersValidateMiddleware = require("../middlewares/usersMiddlewares/loginUserValidateMiddleware");
const authorizeMiddleware = require("../middlewares/usersMiddlewares/authorizeMiddleware");
const createAvatarMiddleware = require("../middlewares/usersMiddlewares/createAvatarMiddleware");
const handleImageMiddleware = require("../middlewares/usersMiddlewares/handleImageMiddleware");

const authRoute = express.Router();

authRoute.post("/register",
  registerUsersValidateMiddleware,
  checkUserExistMiddleware,
  createAvatarMiddleware,
  handleImageMiddleware,
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

authRoute.get("/verify/:verificationToken",
  usersController.verifyToken,
)

module.exports = authRoute;