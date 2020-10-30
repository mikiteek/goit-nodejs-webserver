const fs = require("fs");
const {promises} = fs;
const imgGen = require("js-image-generator");

const onlyNameImage = Date.now() + ".jpg";
const tmpPath = "tmp/" + onlyNameImage;

const createAvatarMiddleware =  (req, res, next) => {
  imgGen.generateImage(500, 300, 80, async (err, image) => {
    try {
      await promises.writeFile(tmpPath, image.data);
    }
    catch (error) {
      console.log(error.message);
    }
  });

  req.avatarParams = {
    onlyNameImage,
    oldPathImage: tmpPath,
  };
  next();
}

module.exports = createAvatarMiddleware;