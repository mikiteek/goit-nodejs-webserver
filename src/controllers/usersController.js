const userModel = require("../models/userModel");
const sendEmailHandler = require("../utils/sendEmailHandler");
const userToClientService = require("../services/userToClientCreateService")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid} = require('uuid');

class UsersController {
  async register (req, res, next) {
    try {
      const costFactor = 6;
      const hashPassword = await bcrypt.hash(req.body.password, costFactor);
      const verificationToken = uuid();
      const userToDb = {
        ...req.body,
        avatarURL: req.avatarParams,
        password: hashPassword,
        verificationToken,
      }
      const user = await userModel.create(userToDb);
      sendEmailHandler(user.email, verificationToken);
      const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);

      const userToClient = {
        user: userToClientService(user),
        token,
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

      const userToClient = {
        user: userToClientService(userToFind),
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
      return res.status(204).send();
    }
    catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const userToClient = userToClientService(req.user);
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
        {new: true, },
      );
      const userToClient = userToClientService(userToUpdate);
      return res.status(200).json(userToClient);
    }
    catch (error) {
      next(error);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      const {file: {filename}, user} = req;
      const avatarURL = `${req.protocol}://${req.get("host")}/images/${filename}`
      const userToUpdate = await userModel.findByIdAndUpdate(
        user.id,
        {$set: {avatarURL}},
        {new: true, },
      );
      const responseBody = {avatarURL: userToUpdate.avatarURL};

      return res.status(200).json(responseBody);
    }
    catch (error) {
      next(error);
    }
  }

  async verifyToken(req, res, next) {
    try {
      const {verificationToken} = req.params;
      const user = await userModel.findOne({verificationToken});
      if (!user) {
        return res.status(404).json({message: "Not found"});
      }
      await userModel.findByIdAndUpdate(user._id, {verificationToken: null}, {useFindAndModify: false});
      return res.status(200).send();
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();