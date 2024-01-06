const vscode = require("vscode");

const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");
const swaggerInit = require("../scripts/swagger");
const path = require("path");
const onSave = (context) =>
  vscode.workspace.onDidSaveTextDocument((document) => {
    const file = path.parse(document.fileName);

    const buildCommand = storage(context).get(storageEnum.BUILD);
    const extensionsBuild = storage(context)
      .get(storageEnum.EXTENSIONS_BUILD)
      .split(",");

    const buildExtensionMatch = extensionsBuild.some((ext) => ext === file.ext);
    
    if (!buildExtensionMatch) return;

    if (buildCommand) {
      const terminal = vscode.window.createTerminal();
      terminal.hide();
      terminal.sendText(buildCommand);
      terminal.dispose();
      vscode.window.showInformationMessage(
        "Swagger documentation generated successfully"
      );
      return;
    }
    const workspaceName = storage(context).get(storageEnum.SELECTED_WORKSPACE);
    swaggerInit(workspaceName + ".json", context);
  });

module.exports = {
  onSave,
};
