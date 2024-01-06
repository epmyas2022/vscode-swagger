const configInit = require("./configInit");
const configProyect = require("./configProyect");
const onSaveConfig = require("./onSaveConfig");
const events = require("./events");
module.exports = (context) => {
  return [
    configInit(context),
    events.onSave(context),
    configProyect(context),
    onSaveConfig(context),
  ];
};
