const Joi = require("joi");

const createContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

const updateContactValidation = (req, res, next) => {
  const {body} = req;
  if (!Object.keys(body).length) {
    return res.status(400).json({message: "Missing fields"});
  }
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
  });
  const validateResult = schema.validate(body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message});
  }
  next();
}

module.exports = {
  createContactValidation,
  updateContactValidation
}