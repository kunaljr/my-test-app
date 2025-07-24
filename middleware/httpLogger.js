const morgan = require('morgan');
const logger = require('./logger');

// Stream to Winston
const stream = {
  write: (message) => logger.info(message.trim())
};

// Only log in dev mode (optional)
const skip = () => process.env.NODE_ENV === 'test';

const httpLogger = morgan('combined', { stream, skip });

module.exports = httpLogger;