const vscode = require("vscode");
const fs = require("fs");

const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");

module.exports = (context) => 
  vscode.commands.registerCommand(
    "swaggercraft.loadConfigProyect",
    async function () {
      const files = fs.readdirSync(`${context.extensionPath}/config/`);

      const options = files.map((file) => file.replace(".json", ""));
      const selected = await vscode.window.showQuickPick(options);

      if (!selected) return;

      const file = fs.readFileSync(
        `${context.extensionPath}/config/${selected}.json`,
        "utf8"
      );

      const config = JSON.parse(file);

      console.log(config);

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

