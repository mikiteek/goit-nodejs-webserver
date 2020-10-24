const Joi = require("joi");

const updateContactValidation = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({message: "missing fields"});
  }
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
    subscription: Joi.string().valid("free", "premium", "pro"),
    password: Joi.string().min(6).max(30),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

module.exports = updateContactValidation;