module.exports = class Error {
  constructor(message) {
    this.body = {
      errors: [
        { detail: message }
      ]
    };
  }
}
