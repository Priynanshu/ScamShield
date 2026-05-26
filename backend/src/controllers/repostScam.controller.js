const scamDetailModel = require("../models/scamDetail.model")
const ApiError = require("../utils/ApiError")

const repostToCommunity = async (req, res, next) => {
    try {
        const {scamId} = req.body
        if(!scamId) {
            throw new ApiError(400, "Scam Message Id is required")
        }

        const scamMessage = await scamDetailModel.findById(scamId)
        if(!scamMessage) {
            throw new ApiError(404, "Scam Message is not Found")
        }

        scamMessage.isReported = true
        scamMessage.save()

        return res.status(200).json({
            message: "Scam message is repost to community",
            scamMessage
        })
    }catch(err) {
        console.log(err)
        next(err)
    }
}

const fetchAllReportsMessages = async (req, res, next) => {
    try {
        const reportsMessages = await scamDetailModel.find({isReported: true})
        if(!reportsMessages || reportsMessages.length === 0) {
            throw new ApiError(404, "No reports messages found")
        }

        return res.status(200).json({
            messages: "reports messages fetch successfully",
            totalReports: reportsMessages.length,
            reportsMessages
        })
    }catch(err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    repostToCommunity,
    fetchAllReportsMessages
}