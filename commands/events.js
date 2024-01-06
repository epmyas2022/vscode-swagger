const vscode = require("vscode");

const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");
const swaggerInit = require("../scripts/swagger");

const onSave = (context) =>
  vscode.workspace.onDidSaveTextDocument((document) => {
    const workspaceName = storage(context).get(storageEnum.SELECTED_WORKSPACE);
    swaggerInit(workspaceName + ".json", context);
  });

module.exports = {
  onSave,
};
