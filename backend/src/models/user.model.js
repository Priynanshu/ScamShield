const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    password: {
        type: String,
        select: false
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;