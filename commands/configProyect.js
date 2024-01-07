const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");

module.exports = (context) =>
  vscode.commands.registerCommand(
    "extension.swaggercraft.loadConfigProyect",
    async function () {
      const files = fs.readdirSync(`${context.extensionPath}/config/`);

      const options = files.map(
        (file) => file.endsWith(".json") && file.replace(".json", "")
      );
      const selected = await vscode.window.showQuickPick(options);

      if (!selected) return;

      const file = fs.readFileSync(
        `${context.extensionPath}/config/${selected}.json`,
        "utf8"
      );

      const config = JSON.parse(file);

      storage(context).create(storageEnum.BUILD, null);

      storage(context).create(storageEnum.SELECTED_WORKSPACE, selected);

      storage(context).create(
        storageEnum.SELECTED_PATH_WORKSPACE,
        config.fullPath
      );

      vscode.window.showInformationMessage(
        `Config proyect ${selected} loaded successfully`
      );
    }
  );
