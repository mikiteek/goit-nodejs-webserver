const checkQueryParamsMiddleware = (req, res, next) => {
  const subscriptions = ['free', 'pro', 'premium'];
  const {page=1, limit=10, sub} = req.query;
  if (page < 1 || limit < 1 || isNaN(page) || isNaN(limit)) {
    return res.status(400).json({message: "Bad request, check 'page' and 'limit' params"});
  }
  if (sub && !subscriptions.find(s => s === sub)) {
    return res.status(400).json({message: "Bad request, param 'sub' can be one of: 'free', 'pro', 'premium'"});
  }
  next();
}

module.exports = checkQueryParamsMiddleware;