const { FORBIDDEN } = require("../constants");

class ForbiddenError extends Error {
  constructor(message = "Access denied") {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
