const looksSame = require("looks-same");
const { PNG } = require("pngjs");
const {
  getImage,
  getImagePath,
  getImageBuffer,
  saveImage,
  scaleImageToSize,
  applyIgnoreAreas,
} = require("./utils");

(async () => {
  // const result = looksSame.createDiff(
  //   {
  //     reference: getImagePath("baseline.png"),
  //     current: getImagePath("screenshot.png"),
  //     diff: getImagePath("diff.png"),
  //   },
  //   () => {
  //     console.log("calback");
  //   }
  // );

  // const result = looksSame.createDiff(
  //   {
  //     reference: getImageBuffer("1.png"),
  //     current: getImageBuffer("2.png"),
  //     highlightColor: "#ff00ff",
  //   },
  //   (err, buffer) => {
  //     console.log("calback");
  //     saveImage("diffBuffer.png", buffer);
  //   }
  // );

  const baseline = getImage("baseline.png");
  const image = getImage("screenshot.png");

  const maxWidth = Math.max(baseline.width, image.width);
  const maxHeight = Math.max(baseline.height, image.height);
  const scaledBaseline = scaleImageToSize(baseline, maxWidth, maxHeight);
  const scaledImage = scaleImageToSize(image, maxWidth, maxHeight);

  // const baselineIgnored = applyIgnoreAreas(scaledBaseline, data.ignoreAreas);
  // const imageIgnored = applyIgnoreAreas(scaledImage, data.ignoreAreas);

  const result = await compare(baseline, image);
  const result = await createDiff(baseline, image);

  console.log("done");
})();

async function compare(baseline, image) {
  return new Promise((resolve, reject) => {
    looksSame(
      PNG.sync.write(baseline),
      PNG.sync.write(image),
      null,
      (error, diffResult) => {
        if (error) {
          // reject(error.message);
          console.log(error.message);
        }
        resolve(diffResult);
        console.log(diffResult);
      }
    );
  });
}

async function createDiff(baseline, image) {
  return new Promise((resolve, reject) => {
    looksSame.createDiff(
      {
        reference: PNG.sync.write(baseline),
        current: PNG.sync.write(image),
        highlightColor: "#ff00ff",
      },
      (error, buffer) => {
        if (error) {
          reject(error.message);
        }
        saveImage("diff2.png", buffer);
        resolve();
      }
    );
  });
}
