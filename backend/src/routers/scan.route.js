const express = require("express")
const uploadSingleImage  = require("../middlewares/file.middleware")
const scamDetectController = require("../controllers/scamDetect.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/text", authMiddleware.identifyUser, scamDetectController.aiScamDetectOfText)
router.post("/url", authMiddleware.identifyUser, scamDetectController.aiScamDetectOfUrl)
router.post("/image", authMiddleware.identifyUser, uploadSingleImage("image"), scamDetectController.aiScamDetectOfImage)
router.get("/reports", authMiddleware.identifyUser, scamDetectController.getAllScamMessages)

module.exports = router