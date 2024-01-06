const vscode = require("vscode");

const { storage, storageEnum } = require("../scripts");

const excuteTerminal = (command) => {
  const terminal = vscode.window.createTerminal();
  terminal.show();
  terminal.sendText(command);
};

const installDependencies = (packageName) => {

  const command = `npm install ${packageName} --save`;
  excuteTerminal(command);
};

module.exports = {
  installDependencies,
  excuteTerminal,
};
