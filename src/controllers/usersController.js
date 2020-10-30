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
        avatarURL: req.avatarParams,
        password: hashPassword,
      }
      const {_id: id} = await userModel.create(userToDb);
      const token = await jwt.sign({id}, process.env.JWT_SECRET);
      const user = await userModel.updateToken(id, token);
      const userToClient = {
        user,
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
      const userToFind = await userModel.findOne({email: req.body.email})
      if (!userToFind) {
        return res.status(401).json({message: "Not authorized"});
      }
      const isPasswordValid = await bcrypt.compare(password, userToFind.password);
      if(!isPasswordValid) {
        return res.status(401).json({message: "Not authorized"});
      }

      const token = await jwt.sign({id: userToFind._id}, process.env.JWT_SECRET);
      const user = await userModel.updateToken(userToFind._id, token);
      const userToClient = {
        user,
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

  async getCurrentUser(req, res, next) {
    try {
      const {email, subscription} = req.user;
      const userToClient = {
        email,
        subscription,
      }
      return res.status(200).json(userToClient);
    }
    catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const {user} = req;
      const userToUpdate = await userModel.findByIdAndUpdate(
        user.id,
        {$set: req.body,},
        {new: true,}
      );
      const userToClient = {
        email: userToUpdate.email,
        subscription: userToUpdate.subscription,
      }
      return res.status(200).json(userToClient);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();