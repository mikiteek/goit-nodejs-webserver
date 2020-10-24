const userModel = require("../../models/userModel");

const checkUserExistMiddleware = async (req, res, next) => {
  const {email} = req.body;
  try {
    const user = await userModel.findOne({email});
    if (user) {
      return res.status(409).json({message: "Email already exist"})
    }
    next();
  }
  catch (error) {
    next(error);
  }
}

module.exports = checkUserExistMiddleware;