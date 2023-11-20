const ValidationError = require('./ValidationError');
const AthorizedError = require('./AthorizedError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');
const ServerError = require('./ServerError');

module.exports = {
  ValidationError, AthorizedError, ForbiddenError, NotFoundError, ConflictError, ServerError,
};
