const express = require("express");
var CanvasTextWrapper = require("canvas-text-wrapper").CanvasTextWrapper;
const canvas = require("canvas");
var cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5500; // Or your desired port
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("Welcome to the world of dynamic images generation");
});

app.post("/temp", async (req, res) => {
  const { companyName, jobRole, responsibilities } = req.body;
  if (!jobRole || !responsibilities) {
    return res.status(400).json({
      message: "missing payload data",
      required: "jobRole(string), responsibilities([string])",
      optinal: "companyName(string)",
    });
  }
  const { loadImage, createCanvas } = require("canvas");
  const textDarkColor = "#000000";
  try {
    const templateImage = await loadImage("./template/template.png");
    const { width, height } = templateImage;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    // ADDING TEMPLATE IMAGE IN CANVAS
    context.drawImage(templateImage, 0, 0);
    // IF COMPANY NAME GIVEN THEN ADD OTHERWISE DON'T ADD.
    if (companyName) {
      context.font = `bold ${45}pt sans-serif`;
      context.fillStyle = textDarkColor; // Dark orange
      context.fillText(companyName, 53, 85);
    }
    // ADDING JOB ROLE IN TEMPLATE
    context.font = `normal ${35}pt sans-serif`;
    context.fillStyle = textDarkColor;
    context.textAlign = "center";
    context.fillText(jobRole, 333, 596);

    // ADDING LIST OF RESPONSIBILITIES IN TEMPLATE
    const margin = 140;
    const itemSpace = 30; // Space between lines
    let marginTop = height / 2 - 50; // Starting y-position
    for (let i = 0; i < responsibilities.length; i++) {
      let currentListItem = responsibilities[i];
      const currentListItemWidth = context.measureText(currentListItem).width;
      const availableWidth = canvas.width - margin - 150;
      context.font = `normal ${18}pt sans-serif`;
      context.fillStyle = textDarkColor; // Green
      context.textAlign = "left";
      context.lineWidth = 2;

      CanvasTextWrapper(canvas, `• ${currentListItem}`, {
        paddingX: margin,
        paddingY: marginTop,
        lineHeight: 1.5,
        font: "lighter 19px sans",
      });
      //context.fillText(`• ${currentListItem}`, margin, y); // Account for font size
      //marginTop += itemSpace;
      if (currentListItemWidth > availableWidth) {
        let count = currentListItemWidth / availableWidth;
        for (let i = 0; i <= Math.floor(count); i++) {
          marginTop += itemSpace;
        }
      } else {
        marginTop += itemSpace;
      }
    }
    const imgBuffer = canvas.toBuffer("image/png");
    const imgPath = path.join(__dirname, "jdImage1.png"); // Use path.join to create an absolute path
    fs.writeFileSync(imgPath, imgBuffer);
    // Send the file as a response
    res.sendFile(imgPath, {}, (err) => {
      // Cleanup: Delete the temporary file after sending
      fs.unlinkSync(imgPath);
      if (err) {
        console.error("Error sending file:", err);
        res.status(err.status).end();
      } else {
        console.log("File sent successfully");
      }
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("Error generating image");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port => ${port}`);
});
