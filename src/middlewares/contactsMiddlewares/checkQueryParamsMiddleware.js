const checkQueryParamsMiddleware = (req, res, next) => {
  const {page=1, limit=10} = req.query;
  if (page < 1 || limit < 1 || isNaN(page) || isNaN(limit)) {
    return res.status(400).json({message: "Bad request"});
  }
  next();
}

module.exports = checkQueryParamsMiddleware;