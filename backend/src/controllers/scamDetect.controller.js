const scamDetailModel = require("../models/scamDetail.model")
const uploadImage = require("../services/cloudStorage.service")
const ApiError = require("../utils/ApiError")
const userModel = require("../models/user.model")
const {detectScamFromText, detectScamFromImage, detectScamFromUrl} = require("../services/ai.service")

const aiScamDetectOfText = async (req, res, next) => {
    try {
        const {message} = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if(!message) {
            return new ApiError(400, "Scam Message is Required")
        }

        const result = await detectScamFromText(next, message);
        if(!result) return;

        const scanResult = await scamDetailModel.create({
            location: user.location,
            inputType: "text",
            scamMessage: message,
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
        const {message} = req.body
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if(!message) {
            throw new ApiError(400, "Scam URL is Required")
        }

        const result = await detectScamFromUrl(next, message);
        if(!result) return;

        const scanResult = await scamDetailModel.create({
            location: user.location,
            inputType: "url",
            scamMessage: message,
            ...result
        })

        return res.status(201).json({
            message: "Scam Detect Successfully",
            aiResult: scanResult
        })
    } catch (error) {
        next(error)
    }
}

const aiScamDetectOfImage = async (req, res, next) => {
    try {
        const message = req.file;
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
        const imageDataUrl =
            `data:${message.mimetype};base64,${base64Image}`;

        // send base64 image to AI
        const result = await detectScamFromImage(
            next,
            imageDataUrl
        );
        if (!result) return;

        const scanResult = await scamDetailModel.create({
                location: user.location,
                inputType: "image",
                scamMessage: imageUrl,
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

module.exports = {
    aiScamDetectOfText,
    aiScamDetectOfUrl,
    aiScamDetectOfImage,
    getAllScamMessages
}