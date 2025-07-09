const { BAD_REQUEST } = require("../constants");

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
