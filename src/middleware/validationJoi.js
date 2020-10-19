const Joi = require("joi");

const createContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    console.log(validateResult)
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

module.exports = {
  createContactValidation,
}