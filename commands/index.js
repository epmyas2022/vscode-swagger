const configInit = require("./configInit");
const events = require("./events");
module.exports = (context) => {
  return [configInit(context), events.onSave(context)];
};
