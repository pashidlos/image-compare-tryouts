const path = require("path");
const { PNG } = require("pngjs");
const { writeFileSync, readFileSync } = require("fs");

function getImagePath(name) {
  return path.resolve("src/images", name);
}

function getImageBuffer(name) {
  return readFileSync(getImagePath(name));
}

function saveImage(name, imageBuffer) {
  return writeFileSync(getImagePath(name), imageBuffer);
}

module.exports = { getImagePath, getImageBuffer, saveImage };
