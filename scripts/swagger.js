const swaggerAutogen = require("swagger-autogen")();
const path = require("path");
const fs = require("fs");
const storage = require("./storage");
const storageEnum = require("./enums/storageEnum");
const vscode = require("vscode");

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

const swaggerInit = async (nameFile, context) => {
  try {
    const file = path.resolve(`${context.extensionPath}/config/`, nameFile);

    if (!fs.existsSync(file)) {
      console.log(`File ${nameFile} not found ${file}`);
      vscode.window.showErrorMessage(`File ${nameFile} not found ${file}`);
      return;
    }

    const docFile = require(file);

    let workspacePath = storage(context).get(
      storageEnum.SELECTED_PATH_WORKSPACE
    );

    if (workspacePath.startsWith("/"))
      workspacePath = workspacePath.substring(1);

    const outputFile = workspacePath + docFile.outputFile;

    const routes = docFile.routes
      .split(",")
      .map((route) => `${workspacePath}${route}`);

    const doc = {
      info: {
        title: docFile.info.title,
        description: docFile.info.description,
      },
      host: docFile.host,
    };

    const generate = await swaggerAutogen(outputFile, routes, doc);

    if (generate && !generate["success"]) {
      vscode.window.showErrorMessage(`Error in generate swagger file`);
    }

    vscode.window.showInformationMessage(`Swagger file generated successfully`);


  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
};

module.exports = swaggerInit;
