const looksSame = require("looks-same");
const { getImagePath, getImageBuffer, saveImage } = require("./utils");

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

  const result = looksSame.createDiff(
    {
      reference: getImageBuffer("baseline.png"),
      current: getImageBuffer("screenshot.png"),
      highlightColor: "#ff00ff",
    },
    (err, buffer) => {
      console.log("calback");
      saveImage("diffBuffer.png", buffer);
    }
  );

  // const result = await looksSame(
  //   getImagePath("baseline.png"),
  //   getImagePath("screenshot.png"),
  //   (error, result) => {
  //     console.log("calback");
  //     console.log(result);
  //   }
  // );

  console.log("done");
})();
