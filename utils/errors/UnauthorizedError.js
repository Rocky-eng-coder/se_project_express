const { UNAUTHORIZED } = require("../constants");

class UnauthorizedError extends Error {
  constructor(message = "Authorization required") {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
