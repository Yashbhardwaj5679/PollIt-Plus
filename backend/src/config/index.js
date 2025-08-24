const connectDB = require('./db');
const redisClient = require('./redis');
const kafka = require('./kafka');

module.exports = {
  connectDB,
  redisClient,
  kafka,
};
