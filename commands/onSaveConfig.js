const vscode = require("vscode");
const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");
module.exports = (context) => 
  vscode.commands.registerCommand("swaggercraft.onSaveConfig", async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) return;

    const buildSwagger = await vscode.window.showInputBox({
      prompt: "compile swagger on save",
      placeHolder: "example : npm run swagger",
    });

    storage(context).create(
      storageEnum.BUILD,
      buildSwagger.trim() || "npm run swagger"
    );
  });

