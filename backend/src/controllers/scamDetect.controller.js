const scamDetailModel = require("../models/scamDetail.model")
const uploadImage = require("../services/cloudStorage.service")
const ApiError = require("../utils/ApiError")
const userModel = require("../models/user.model")
const {detectScamFromText, detectScamFromImage, detectScamFromUrl} = require("../services/ai.service")

const aiScamDetectOfText = async (req, res, next) => {
    try {
        const { message, language = 'English' } = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if(!message) {
            return new ApiError(400, "Scam Message is Required")
        }

        const result = await detectScamFromText(next, message, language);
        if(!result) return;

        const scanResult = await scamDetailModel.create({
            location: user.location,
            inputType: "text",
            scamMessage: message,
            language,
            ...result
        })

        return res.status(201).json({
            message: "Scam Detect Successfully",
            aiResult: scanResult
        })
    } catch (error) {
         console.log(error)
        next(error)
    }
}

const aiScamDetectOfUrl = async (req, res, next) => {
    try {
        const { message, language = 'English' } = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if(!message) {
            throw new ApiError(400, "Scam URL is Required")
        }

        const result = await detectScamFromUrl(next, message, language);
        if(!result) return;

        const scanResult = await scamDetailModel.create({
            location: user.location,
            inputType: "url",
            scamMessage: message,
            language,
            ...result
        })

        return res.status(201).json({
            message: "Scam Detect Successfully",
            aiResult: scanResult
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const aiScamDetectOfImage = async (req, res, next) => {
    try {
        const message = req.file;
        const language = req.body.language || 'English';
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if (!message) {
            return next(
                new ApiError(400, "Scam Image is Required")
            );
        }

        // upload to imagekit
        const imageUrl = await uploadImage(message);

        // convert image to base64
        const base64Image = message.buffer.toString("base64");

        // create data url
        const imageDataUrl = `data:${message.mimetype};base64,${base64Image}`;

        // send base64 image to AI with language
        const result = await detectScamFromImage(next, imageDataUrl, language);
        if (!result) return;

        const scanResult = await scamDetailModel.create({
                location: user.location,
                inputType: "image",
                scamMessage: imageUrl,
                language,
                ...result,
            });
        return res.status(201).json({
            success: true,
            message: "Scam Detect Successfully",
            aiResult: scanResult,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAllScamMessages = async (req, res, next) => {
    try {
        const messages = await scamDetailModel.find()
        if(!messages  || messages.length === 0) {
            throw new ApiError(404, "No messages Found")
        }

        return res.status(200).json({
            message: "fetch scam messages successfully",
            totalMessages: messages.length,
            scamMessages: messages
        })
    }catch(err) {
        console.log(err)
        next(err)
    }
}

// NEW: Stats endpoint — real data from DB
const getStats = async (req, res, next) => {
    try {
        const totalScans = await scamDetailModel.countDocuments()
        const scamsFound = await scamDetailModel.countDocuments({ verdict: { $in: ['SCAM', 'SUSPICIOUS'] } })
        // People protected = unique locations that received a SAFE result, or simple estimate
        const safeScans = await scamDetailModel.countDocuments({ verdict: 'SAFE' })

        return res.status(200).json({
            message: "Stats fetched successfully",
            totalScans,
            scamsFound,
            peopleSaved: safeScans
        })
    } catch(err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    aiScamDetectOfText,
    aiScamDetectOfUrl,
    aiScamDetectOfImage,
    getAllScamMessages,
    getStats
}
