const fs = require("fs");
const {promises} = fs;
const imgGen = require("js-image-generator");

const tmpPath = "tmp/";

const createAvatarMiddleware =  (req, res, next) => {
  imgGen.generateImage(500, 300, 80, async (err, image) => {
    try {
      await promises.writeFile(tmpPath + Date.now() + ".jpg", image.data);
    }
    catch (error) {
      console.log(error.message);
    }
  });

  next();
}

module.exports = createAvatarMiddleware;