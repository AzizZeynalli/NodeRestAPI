const { createClient } = require('@redis/client');
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://168.119.228.222:6379'
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();
