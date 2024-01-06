const fs = require("fs");
function storage(context) {
  const create = async (key, value) => {
    if (value === undefined) return;

    await context.globalState.update(key, value);
  };

  const get = (key) => {
    return context.globalState.get(key);
  };

  const getProyect = ( key, proyectName) => {
    const file = fs.readFileSync(
      `${context.extensionPath}/config/${proyectName}.json`,
      "utf8"
    );

    const docConfig = JSON.parse(file);

    return docConfig[key];
  };

  return {
    create,
    get,
    getProyect,
  };
}

module.exports = storage;
