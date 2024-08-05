// index.js
const fs = require("fs");
const inquirer = require("inquirer");
const { Circle, Triangle, Square } = require("./lib/shapes");

async function generateLogo() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters for the logo:",
      validate: (input) =>
        input.length <= 3 || "Text must be up to three characters.",
    },
    {
      type: "input",
      name: "textColor",
      message: "Enter the text color (keyword or hexadecimal):",
    },
    {
      type: "list",
      name: "shape",
      message: "Select a shape for the logo:",
      choices: ["Circle", "Triangle", "Square"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Enter the shape color (keyword or hexadecimal):",
    },
  ]);

  let shape;
  switch (answers.shape) {
    case "Circle":
      shape = new Circle(answers.shapeColor);
      break;
    case "Triangle":
      shape = new Triangle(answers.shapeColor);
      break;
    case "Square":
      shape = new Square(answers.shapeColor);
      break;
  }

  const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${
    answers.textColor
  }">${answers.text}</text>
</svg>`;

  fs.writeFileSync("logo.svg", svgContent);
  console.log("Generated logo.svg");
}

generateLogo();
