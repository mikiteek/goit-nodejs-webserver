const {Types: {ObjectId}} = require("mongoose");

const findByIdMiddleware = (req, res, next) => {
  const {id} = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({message: "Not found"});
  }
  next();
}

module.exports = findByIdMiddleware;