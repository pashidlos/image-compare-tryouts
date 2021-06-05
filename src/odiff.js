const odiff = require("odiff-bin");
const {getImagePath} = require("./utils");

(async () => {
  const result = await odiff.compare(
    getImagePath("baseline.png"),
    getImagePath("screenshot.png"),
    getImagePath("diff.png"),
    null
  );

  console.log(result);
})();
