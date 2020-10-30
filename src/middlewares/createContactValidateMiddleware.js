const Joi = require("joi");

const createContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().valid("free", "premium", "pro").default("free"),
    password: Joi.string().min(6).max(30).required(),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

module.exports = createContactValidation;