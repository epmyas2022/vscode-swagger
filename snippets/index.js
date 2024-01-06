const vscode = require("vscode");
const items = require("./snippets");


module.exports = (context) =>
  items(context).map((item) => {
    vscode.languages.registerCompletionItemProvider(
      item.lenguage,
      {
        provideCompletionItems(document, position) {
          // Lógica para proporcionar sugerencias de autocompletado
          const range = new vscode.Range(position.with(undefined, 0), position);
          const snippetCompletion = new vscode.CompletionItem(
            item.key,
            vscode.CompletionItemKind.Snippet
          );
          snippetCompletion.insertText = new vscode.SnippetString(item.snippet);
          snippetCompletion.range = range;
          return [snippetCompletion];
        },
      },
      item.key
    );
  });
