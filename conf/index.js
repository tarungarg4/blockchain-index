let local;
if (moduleExists('./local.json')) {
  local = require('./local.json');
}

module.exports = {
  ...(local && { local }),
};
