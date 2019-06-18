const inversify = require('inversify');
const bindings = require('./bindings');

const container = new inversify.Container();

module.exports = {
  container,
  bindings
};
