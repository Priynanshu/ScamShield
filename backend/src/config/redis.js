const redis = require("ioredis")

const redisClient = new redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null
})

redisClient.on("connect", () => {
    console.log("Connected to Redis")
})

redisClient.on("error", (err) => {
    console.error("Redis error:", err)
})

module.exports = redisClient