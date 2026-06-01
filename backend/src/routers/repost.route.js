const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const repostScamController = require("../controllers/repostScam.controller")

const router = express.Router()

router.post("/", authMiddleware.identifyUser, repostScamController.repostToCommunity)
router.get("/community", repostScamController.fetchAllReportsMessages)
// NEW: Mark relatable (requires auth)
router.post("/relatable", authMiddleware.identifyUser, repostScamController.markRelatable)

module.exports = router
