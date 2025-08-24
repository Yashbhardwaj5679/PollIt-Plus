// src/utils/logger.js
const morgan = require('morgan');

const logger = morgan(':method :url :status :response-time ms');

module.exports = logger;
