const express = require("express")
const uploadSingleImage  = require("../middlewares/file.middleware")
const scamDetectController = require("../controllers/scamDetect.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const rateLimiterMiddleware = require("../middlewares/rateLimiter.middleware")

const router = express.Router()

router.post("/text", authMiddleware.identifyUser, rateLimiterMiddleware.aiApiRateLimit, scamDetectController.aiScamDetectOfText)
router.post("/url", authMiddleware.identifyUser, rateLimiterMiddleware.aiApiRateLimit, scamDetectController.aiScamDetectOfUrl)
router.post("/image", authMiddleware.identifyUser, rateLimiterMiddleware.aiApiRateLimit, uploadSingleImage("image"), scamDetectController.aiScamDetectOfImage)
router.get("/reports", authMiddleware.identifyUser, scamDetectController.getAllScamMessages)

module.exports = router