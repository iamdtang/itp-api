module.exports = class BadRequest {
  constructor(validationErrors) {
    this.status = 400;
    this.body = Object.keys(validationErrors).map((attribute) => {
      return {
        detail: validationErrors[attribute][0],
        source: {
          pointer: `data/attributes/${attribute}`
        }
      };
    });
  }
}
