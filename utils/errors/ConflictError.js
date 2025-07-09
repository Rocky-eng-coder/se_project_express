const { CONFLICT } = require("../constants");

class ConflictError extends Error {
  constructor(message = "Conflict occured") {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = ConflictError;
