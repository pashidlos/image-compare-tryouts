const path = require("path");
const { PNG } = require("pngjs");
const { writeFileSync, readFileSync } = require("fs");

function getImagePath(name) {
  return path.resolve("src/images", name);
}

function getImageBuffer(name) {
  return readFileSync(getImagePath(name));
}

function getImage(name) {
  return PNG.sync.read(readFileSync(getImagePath(name)));
}

function saveImage(name, imageBuffer) {
  return writeFileSync(getImagePath(name), imageBuffer);
}

function scaleImageToSize(image, width, height) {
  if (width > image.width || height > image.height) {
    const preparedImage = new PNG({ width, height, fill: true });
    PNG.bitblt(image, preparedImage, 0, 0, image.width, image.height);
    return preparedImage;
  }
  return image;
}

function applyIgnoreAreas(image, ignoreAreas) {
  ignoreAreas.forEach((area) => {
    for (let y = area.y; y < area.y + area.height; y++) {
      for (let x = area.x; x < area.x + area.width; x++) {
        const k = 4 * (image.width * y + x);
        image.data[k + 0] = 0;
        image.data[k + 1] = 0;
        image.data[k + 2] = 0;
        image.data[k + 3] = 0;
      }
    }
  });
  return image;
}

module.exports = {
  getImagePath,
  getImageBuffer,
  saveImage,
  scaleImageToSize,
  applyIgnoreAreas,
  getImage,
};
