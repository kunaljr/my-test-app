const redis = require('redis');

const client = redis.createClient(); // For local Redis server

client.on('error', (err) => console.error('❌ Redis Client Error', err));

(async () => {
  await client.connect(); // Important for Redis v4+
})();

module.exports = client;
