const mongoose = require("mongoose")

const scamDetailSchema = new mongoose.Schema({
    location: {
        type: String
    },
    inputType: {
        type: String,
        enum: ['text','image','url'],
        required: true,
    },
    category: {
        type: String,
        enum: ['Bank Fraud','Job Fraud','Phishing','OTP Scam','Other'],
    },
    scamMessage: {
        type: String,
        required: true,
    },
    verdict: {
        type: String,
        enum: ['SAFE','SUSPICIOUS','SCAM'],
        required: true,
    },
    confidence: {
        type: Number,
        min: 0,
        max: 100,
    },
    reasonHindi: {
        type: String
    },
    reasonEnglish: {
        type: String
    },
    redFlags: {
        type: Array
    },
    isReported: {
        type: Boolean,
        default: false
    },
    reportCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const scamDetailModel = mongoose.model("ScamDetail", scamDetailSchema)
module.exports = scamDetailModel