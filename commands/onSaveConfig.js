const vscode = require("vscode");
const storage = require("../scripts/storage");
const storageEnum = require("../scripts/enums/storageEnum");
module.exports = (context) =>
  vscode.commands.registerCommand("swaggercraft.onSaveConfig", async () => {


    const buildSwagger = await vscode.window.showInputBox({
      prompt: "compile swagger on save",
      placeHolder: "example : npm run swagger",
    });

    const extensionsBuild = await vscode.window.showInputBox({
      prompt: "type ext your build command",
      placeHolder: ".js,.ts,.php,.yml,.yaml,.json",
    });

    storage(context).create(
      storageEnum.EXTENSIONS_BUILD,
      extensionsBuild.trim() || ".js,.ts,.php,.yml,.yaml,.json"
    );

    storage(context).create(
      storageEnum.BUILD,
      buildSwagger.trim() || null
    );
  });
