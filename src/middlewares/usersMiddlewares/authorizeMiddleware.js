const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

const authorizeMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.replace("Bearer ", "");

    let userId;
    try {
      userId = await jwt.verify(token, process.env.JWT_SECRET).id;
    }
    catch (error) {
      return res.status(401).json({message: "Not authorized"});
    }
    const user = await userModel.findById(userId);
    if (!user || user.token !== token) {
      return res.status(401).json({message: "Not authorized"});
    }
    req.user = user;
    req.token = token;
    next();
  }
  catch (error) {
    next(error)
  }
}

module.exports = authorizeMiddleware;