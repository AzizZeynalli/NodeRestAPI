const { createClient } = require('@redis/client');
const redisClient = createClient({ url: 'redis://168.119.228.222:6379' });

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');

    await redisClient.set('test_key', 'Hello Redis!');
    console.log('Set key reply: OK');

    const value = await redisClient.get('test_key');
    console.log('Get key reply:', value);
  } catch (err) {
    console.error('Redis operation error:', err);
  } finally {
    await redisClient.quit();
    console.log('Redis client disconnected');
  }
})();
