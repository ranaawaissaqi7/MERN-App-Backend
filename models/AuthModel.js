
const mongoose = require("mongoose");

const userSignUpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const UserSignUpModel = mongoose.model("UserSignUpSchema", userSignUpSchema)

module.exports = UserSignUpModel;