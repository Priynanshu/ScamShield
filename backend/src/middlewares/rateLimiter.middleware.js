const { rateLimit } = require("express-rate-limit");

const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});

const authRateLimit = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 2, // Limit each IP to 20 requests per windowMs for auth routes
    message: "Too many authentication attempts from this IP, please try again after 15 minutes"
})

const aiApiRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 requests per windowMs for AI API routes
    message: "Too many requests to the AI API from this IP, please try again after an hour"
})

module.exports = {
    globalRateLimit,
    authRateLimit,
    aiApiRateLimit
}
