const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UsersController {
  async register (req, res, next) {
    try {
      const costFactor = 6;
      const hashPassword = await bcrypt.hash(req.body.password, costFactor);
      const userToDb = {
        ...req.body,
        password: hashPassword,
      }
      const {email, subscription} = await userModel.create(userToDb);
      const userToClient = {
        user: {email, subscription},
        token: ""
      };

      return res.status(201).json(userToClient);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();