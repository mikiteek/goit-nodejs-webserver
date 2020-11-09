const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const {promises: fsPromises} = require("fs");
const path = require("path");

const imageMinifyMiddleware = async (req, res, next) => {
  try{
    const MINIFIED_DIR = "src/public/images";
    const {path: imageToMinPath, filename} = req.file;

    await imagemin([imageToMinPath], {
      destination: MINIFIED_DIR,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });
    await fsPromises.unlink(imageToMinPath);
    req.file = {
      ...req.file,
      path: path.join(MINIFIED_DIR, filename),
      destination: MINIFIED_DIR,
    }
    next();
  }
  catch (error) {
    next(error);
  }
}

module.exports = imageMinifyMiddleware;