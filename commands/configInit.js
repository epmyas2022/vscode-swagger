const vscode = require("vscode");
const fs = require("fs");
const dependecies = require("../helpers/dependencies");
const { storage, storageEnum, swaggerInit } = require("../scripts/index");

module.exports = (context) =>
  vscode.commands.registerCommand("swaggercraft.configInit", async function () {
    try {
      vscode
        .window.showInformationMessage(`NOTE: If you are using the express Router, you must pass in the 'routes' only the 
		root file where the route starts, such as index.js, app.js, routes.js, etc ... `);

      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders || workspaceFolders.length === 0) return;

      const workspaceName = workspaceFolders[0].name;
      const workspacePath = workspaceFolders[0].uri.path;

      const title = await vscode.window.showInputBox({
        prompt: "title of your API",
        placeHolder: "My API",
      });

      const description = await vscode.window.showInputBox({
        prompt: "description of your API",
        placeHolder: "Description",
      });

      const host = await vscode.window.showInputBox({
        prompt: "host of your API",
        placeHolder: "localhost:3000",
      });

      const outputFile = await vscode.window.showInputBox({
        prompt: "output file of your API",
        placeHolder: "./swagger-output.json",
      });

      const routes = await vscode.window.showInputBox({
        prompt: "routes of your API",
        placeHolder: workspacePath,
      });

      const docConfig = {
        info: {
          title: title || "My API",
          description: description || "Description",
        },
        host: host || "localhost:3000",
        routes: routes || "./path/userRoutes.js, ./path/bookRoutes.js",
        outputFile:  outputFile || "/swagger-output.json",
        fullPath: workspacePath,
      };

      fs.writeFileSync(
        `${context.extensionPath}/config/${workspaceName}.json`,
        JSON.stringify(docConfig)
      );

      storage(context).create(storageEnum.SELECTED_WORKSPACE, workspaceName);

      storage(context).create(
        storageEnum.SELECTED_PATH_WORKSPACE,
        workspacePath
      );

      swaggerInit(
        storage(context).get(storageEnum.SELECTED_WORKSPACE) + ".json",
        context
      );

      const answer = await vscode.window.showInformationMessage(
        `Do you want to install the dependencie 'swagger-ui-express'?`,
        "Yes",
        "No"
      );
  
      if (answer === "Yes"){
        dependecies.installDependencies("swagger-ui-express");
       
      }
    } catch (err) {
      console.log(err);
    }
  });
