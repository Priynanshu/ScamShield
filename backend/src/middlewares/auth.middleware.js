const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const identifyUser = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new ApiError(401, "Unauthorized: No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        next(new ApiError(401, "Unauthorized: Invalid token"));
    }
}

module.exports = {
    identifyUser
}