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
  async login(req, res, next) {
    try {
      const {password} = req.body;
      const user = await userModel.findOne({email: req.body.email})
      if (!user) {
        return res.status(401).json({message: "Not authorized"});
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid) {
        return res.status(401).json({message: "Not authorized"});
      }

      const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const {email, subscription} = await userModel.updateToken(user._id, token);
      const userToClient = {
        user: {email, subscription},
        token,
      }
      return res.status(200).json(userToClient);

    }
    catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const {_id: id} = req.user;
      await userModel.updateToken(id, null);
      return res.status(204).send();
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();