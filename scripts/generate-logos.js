const fs = require("fs");
const { createCanvas } = require("canvas");

// Ensure logos directory exists
const dir = "./public/logos";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Sponsor names from the sponsors array
const sponsors = [
  "Lionheart Dispensary",
  "High Mountain",
  "Lifted Supply",
  "GreenHaus",
  "Fuller Dreamz",
];

// Create placeholder logos
sponsors.forEach((sponsor, index) => {
  const canvas = createCanvas(200, 120);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 200, 120);

  // Add text
  ctx.fillStyle = "#000000";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(sponsor, 100, 60);

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`${dir}/sponsor${index + 1}.png`, buffer);
  console.log(`Generated ${dir}/sponsor${index + 1}.png`);
});

console.log("Logo generation complete!");
