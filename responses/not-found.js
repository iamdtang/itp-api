const Error = require('./error');

module.exports = class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
