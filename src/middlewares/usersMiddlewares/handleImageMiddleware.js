const fs = require("fs");
const {promises} = fs;

const handleImagesMiddleware = async (req, res, next) => {
  try {
    const {oldPathImage, onlyNameImage} = req.avatarParams;
    const avatarURL = "http://localhost:3000/images/" + onlyNameImage;
    const avatarNewPath = "src/public/images/" + onlyNameImage;
    await promises.rename(oldPathImage, avatarNewPath);
    req.avatarParams = avatarURL;
  }
  catch (error) {
    next(error);
  }
  next();
}

module.exports = handleImagesMiddleware;