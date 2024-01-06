// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

const commands = require("./commands");


const snippets = require("./snippets");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "swaggercraft" is now active!');

  snippets(context);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "swaggercraft.helloWorld",
    async function () {
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from swaggercraft!");
    }
  );

  context.subscriptions.push(disposable, ...commands(context));
}

// This method is called when your extension is deactivated
function deactivate() {
  console.log("Swaggercraft deactivated");
  
}

module.exports = {
  activate,
  deactivate,
};
