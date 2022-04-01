const fs = require("fs");
const { createCanvas } = require("canvas");

module.exports = function (AvatarName, AvatarColor, BackgroundColor) {
  let canvas = createCanvas(1024, 1024);
  const context = canvas.getContext("2d");

  // Draw background
  context.fillStyle = AvatarColor || "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 100px Assistant";
  context.fillStyle = BackgroundColor || "green";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(AvatarName, canvas.width / 2, canvas.height / 2);

  const out = fs.createWriteStream(__dirname + "/test.png");
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
  return canvas.toDataURL("image/png");
};
