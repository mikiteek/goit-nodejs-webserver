const Joi = require("joi");
const ErrorBadRequest400 = require("../../helpers/errors/errorBadRequest400");

const registerUserValidateMiddleware = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    subscription: Joi.string().valid("free", "premium", "pro").default("free"),
    password: Joi.string().min(6).max(30).required(),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    next(new ErrorBadRequest400(validateResult.error.message));
  }
  next();
}

module.exports = registerUserValidateMiddleware;