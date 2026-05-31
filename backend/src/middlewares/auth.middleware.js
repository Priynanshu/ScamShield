const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const identifyUser = (req, res, next) => {
    try {
        // 1. Cookie-based token (email/password login)
        let token = req.cookies?.token;

        // 2. Authorization header (Google OAuth / localStorage flow)
        if (!token) {
            const authHeader = req.headers?.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.slice(7);
            }
        }

        if (!token) {
            throw new ApiError(401, "Unauthorized: No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        next(new ApiError(401, "Unauthorized: Invalid token"));
    }
};

module.exports = { identifyUser };
