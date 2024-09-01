//for quick reponse from Db

const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
})


//event Listener
redisClient.on('connect', () => {
    console.log('Connected to redis');
})

redisClient.on('error', (err) => {
    console.log('Redis Connected Failed', err);
})

redisClient.connect();

module.exports = { redisClient };