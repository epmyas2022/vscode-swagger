function storage(context) {
  const create = async (key, value) => {
    if (value === undefined) return;

    await context.globalState.update(key, value);
  };

  const get = (key) => {
    return   context.globalState.get(key);
  };

  return {
    create,
    get,
  };
}

module.exports = storage;
