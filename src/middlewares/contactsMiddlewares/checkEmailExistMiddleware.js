const contactModel = require("../../models/contactModel");

const checkEmailExistMiddleware = async (req, res, next) => {
  const {email} = req.body;
  try {
    const contact = await contactModel.findOne({email});
    if (contact) {
      return res.status(409).json({message: "Email already exist"});
    }
    next();
  }
  catch (error) {
    next(error);
  }
}

module.exports = checkEmailExistMiddleware;