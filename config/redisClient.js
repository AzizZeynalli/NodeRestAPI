const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://168.119.228.222:6379',
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect();

module.exports = redisClient;
