const { BAD_REQUEST } = require("../constants");

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

const { CONFLICT } = require("../constants");

class ConflictError extends Error {
  constructor(message = "Conflict occured") {
    super(message);
    this.statusCode = CONFLICT;
  }
}

const { FORBIDDEN } = require("../constants");

class ForbiddenError extends Error {
  constructor(message = "Access denied") {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

const { NOT_FOUND } = require("../constants");

class NotFoundError extends Error {
  constructor(message = "Requested resource not found") {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

const { UNAUTHORIZED } = require("../constants");

class UnauthorizedError extends Error {
  constructor(message = "Authorization required") {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
};
