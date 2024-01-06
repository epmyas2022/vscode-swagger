const vscode = require("vscode");

const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");
const swaggerInit = require("../scripts/swagger");

const onSave = (context) =>
  vscode.workspace.onDidSaveTextDocument((document) => {
    const buildCommand = storage(context).get(storageEnum.BUILD);
    if (buildCommand) {
      const terminal = vscode.window.createTerminal();
      terminal.hide();
      terminal.sendText(buildCommand);

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
