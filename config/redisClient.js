const redis = require("redis");

// console.log({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
// });

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.connect();

module.exports = redisClient;
