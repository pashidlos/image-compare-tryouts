const odiff = require("odiff-bin");
const {getImagePath} = require("./utils");

(async () => {
  const result = await odiff.compare(
    getImagePath("diffLayout1.png"),
    getImagePath("diffLayout2.png"),
    getImagePath("diff.png"),
    {
      failOnLayoutDiff: true
    }
  );

  console.log(result);
})();
