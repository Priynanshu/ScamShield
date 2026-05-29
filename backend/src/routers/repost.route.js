const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const repostScamController = require("../controllers/repostScam.controller")
const cacheMiddleware = require("../middlewares/cache.middleware")

const router = express.Router()

router.post("/", authMiddleware.identifyUser, repostScamController.repostToCommunity)
router.get("/community", cacheMiddleware(600), repostScamController.fetchAllReportsMessages)

module.exports = router