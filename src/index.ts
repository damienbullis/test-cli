#!/usr/bin/env ts-node
import inquirer from "inquirer";
import { createSupportsColor } from "supports-color";
import { stdin, stdout } from "process";
import gradient from "gradient-string";

const getStdOutSupport = () => {
  const stdoutSupportsColor = createSupportsColor(process.stdout);
  if (stdoutSupportsColor) {
    if (stdoutSupportsColor.has16m) {
      return console.log("stdout supports 16m colors");
    }
    if (stdoutSupportsColor.has256) {
      return console.log("stdout supports 256 colors");
    }
    if (stdoutSupportsColor.hasBasic) {
      return console.log("stdout supports basic colors");
    }
  } else return console.log("stdout does not support color");
};
const getStdErrSupport = () => {
  const stderrSupportsColor = createSupportsColor(process.stderr);
  if (stderrSupportsColor) {
    console.log("stderr supports color");
    if (stderrSupportsColor.has16m) {
      return console.log("stderr supports 16m colors");
    }
    if (stderrSupportsColor.has256) {
      return console.log("stderr supports 256 colors");
    }
    if (stderrSupportsColor.hasBasic) {
      return console.log("stderr supports basic colors");
    }
  } else return console.log("stderr does not support color");
};

const getSupportedColor = () => {
  getStdOutSupport();
  getStdErrSupport();
};

// REFACTOR: should return a value that indicates if color is supported
// getSupportedColor();
// move support color to a separate file
// add in error handling to control for colors not supported

let name = "World";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const g = gradient("red", "blue");
  console.log(g(`Hello ${name}!`));
  await sleep(2000);
  return Promise.resolve(g(`Goodbye ${name}!`));
}
// await main();

async function askName() {
  try {
    const prompt = inquirer.createPromptModule();
    const answers = await prompt({
      name: "name",
      type: "input",
      message: "What is your name?",
    });
    console.log(answers);
  } catch (error: any) {
    if (error.isTtyError) {
      console.log(
        `Prompt couldn't be rendered in the current environment ${error.isTtyError}`
      );
    } else {
      console.log(`Something else went wrong ${error}`);
    }
    console.log(error);
  }
}

await askName();
