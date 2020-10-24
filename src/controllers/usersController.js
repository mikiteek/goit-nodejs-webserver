const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UsersController {
  async register (req, res, next) {
    try {
      const costFactor = 6;
      const hashPassword = await bcrypt.hash(req.body.password, costFactor);
      const userToDb = {
        ...req.body,
        password: hashPassword,
      }
      const {_id: id} = await userModel.create(userToDb);

      const token = await jwt.sign({id}, process.env.JWT_SECRET);
      const {email, subscription} = await userModel.updateToken(id, token);

      const userToClient = {
        user: {email, subscription},
        token
      };

      return res.status(201).json(userToClient);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();