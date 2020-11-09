const Joi = require("joi");

const registerUserValidateMiddleware = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    subscription: Joi.string().valid("free", "premium", "pro").default("free"),
    password: Joi.string().min(6).max(30).required(),
    avatarURL: Joi.string(),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

module.exports = registerUserValidateMiddleware;