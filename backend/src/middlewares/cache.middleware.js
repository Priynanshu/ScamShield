const redis = require("../config/redis");
const ApiError = require("../utils/ApiError");

// Simple internal key generator agar alag se import nahi kiya hai to
const defaultKeyGenerator = (req) => {
    return `cache:${req.originalUrl || req.url}`;
};

const cacheMiddleware = (ttl = 300) => {
    return async (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }

        const cacheKey = defaultKeyGenerator(req);

        try {
            // Redis se check karein
            const cachedData = await redis.get(cacheKey);
            if (cachedData) {
                console.log("🚀 Cache hit for key:", cacheKey);
                return res.json(JSON.parse(cachedData));
            }

            console.log("Cache miss for key:", cacheKey);

            //  res.json ko override karein saaf-suthre tareeqe se
            const originalJson = res.json.bind(res);
            
            res.json = function (data) {
                // Sirf tabhi cache karein jab response status 200 (Success) ho
                if (res.statusCode === 200) {
                    // Node-ioRedis v4 ke liye setex best hai (Key, TTL in seconds, Value)
                    redis.setex(cacheKey, ttl, JSON.stringify(data))
                        .catch(err => console.error("Redis setEx Error:", err));
                }
                
                // Original function ko call karein aur data return karein
                return originalJson(data);
            };

            next();

        } catch (error) {
            console.error("⚠️ Cache Middleware Error (Passing through to DB):", error);
            next(); 
        }
    }
}

module.exports = cacheMiddleware;