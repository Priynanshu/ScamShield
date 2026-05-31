const authController = require('../controllers/auth.controller');
const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const rateLimiterMiddleware = require("../middlewares/rateLimiter.middleware")
const passport = require("passport")
const router = express.Router()

router.post("/register", rateLimiterMiddleware.authRateLimit, authController.register)
router.post("/login", rateLimiterMiddleware.authRateLimit, authController.login)
router.get("/me", authMiddleware.identifyUser, authController.getMe)
router.post("/logout", authMiddleware.identifyUser, authController.logout)

// 🔹 Start Google login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 🔹 Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

module.exports = router; 