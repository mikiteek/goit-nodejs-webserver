const Joi = require("joi");

const updateSubscriptionUserMiddleware = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("free", "pro", "premium").required(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

module.exports = updateSubscriptionUserMiddleware;