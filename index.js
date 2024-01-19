const express = require("express");
const canvas = require("canvas");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5500; // Or your desired port
app.use(express.json());

app.get("/temp", async (req, res) => {
 const {company,jobRole,responsibilities} = req.body
  const { loadImage, createCanvas } = require("canvas");
  const textColor = "#000000";
  try {
    const templateImage = await loadImage("./template/template.png");
    const { width, height } = templateImage;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    context.drawImage(templateImage, 0, 0);
    // Dynamic header
    //const company = req.query.company;
    if (company) {
      context.font = `bold ${45}pt sans-serif`;
      context.fillStyle = textColor; // Dark orange
      //context.textAlign = "center";
      context.fillText(company, 53, 85);
    }

    // dynamic header
    const headerText = jobRole;
    const headerFontSize = 35; // Adjust as needed
    context.font = `normal ${headerFontSize}pt sans-serif`;
    context.fillStyle = textColor; // Dark orange
    //context.textBaseline = "top";
    context.textAlign = "center";
    context.fillText(jobRole, 333, 596);

    // Bullet points
    // const bulletPoints = [
    //   "Reactjs Developer",
    //   "Nodejs Developer",
    //   "Angular Developer",
    // ];
    let bulletPoints = responsibilities;
    // const bulletPoints = [
    //   "Manage team: Assign tasks, coordinate departments, optimize resource use.",
    //   "Lead execution: Monitor progress, track milestones, adjust for budget/schedule.",
    //   "Mitigate risks: Identify problems, develop solutions, resolve issues proactively.",
    //   "Communicate effectively: Keep stakeholders informed, update on progress and risks.",
    //   "Foster teamwork: Motivate team, guide members, ensure high quality deliverables.",
    // ];
    // Create a transparent rectangle for margin
    //context.fillStyle = "rgba(10, 10, 0, 1.0)"; // Fully transparent
    //context.fillRect(50, 100, 200, 50); // Margin rectangle

    // Draw text within the margin area
    //context.fillStyle = "black";
    //context.fillText("Job Requirements", 60, 115);

    const bulletFontSize = 18; // Adjust as needed
    const bulletY = height * 0.6;
    const margin = 150; // Left margin
    const lineHeight = 60; // Space between lines
    let y = height / 2 - 20; // Starting y-position
    for (let i = 0; i < bulletPoints.length; i++) {
      let currentListItem = bulletPoints[i];
      const currentListItemWidth = ctx.measureText(currentListItem).width;
      const availableWidth = canvas.width - margin - 30;
      context.font = `normal ${bulletFontSize}pt sans-serif`;
      context.fillStyle = textColor; // Green
      context.textAlign="left"
      context.fillText(`• ${bulletPoints[i]}`, margin, y); // Account for font size
      y += lineHeight;
    }
    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`./resources/T${Date.now()}.png`, imgBuffer);
    res.send("image created successfully");
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("Error generating image");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port => ${port}`);
});
