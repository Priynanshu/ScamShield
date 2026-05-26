const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const repostScamController = require("../controllers/repostScam.controller")

const router = express.Router()

router.post("/", authMiddleware.identifyUser, repostScamController.repostToCommunity)
router.get("/community", authMiddleware.identifyUser, repostScamController.fetchAllReportsMessages)

module.exports = router