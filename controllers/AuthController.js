const joi = require("joi")
const bcrypt = require("bcrypt")
const UserSignUpModel = require("../models/AuthModel")

const userSignUp = async (req, res, next) => {

    // user validation
    const userSignUpSchema = joi.object({
        email: joi.string().trim().email().required(),
        password: joi.string().min(7).required(),
        cpassword: joi.ref("password"),
    })
    const { error } = userSignUpSchema.validate(req.body)

    //if error in validation -> return error via middleware
    if (error) {
        return next(error);
    }


    const { email, password } = req.body

    try {

        const emailIsExist = await UserSignUpModel.exists({ email })

        if (emailIsExist) {
            const error = {
                status: 302,
                message: "User is already Exist Please go to Login Page"
            }

            return next(error)

        } else {

            // hash password
            const hashPassword = await bcrypt.hash(password, 10)

            const addUser = await UserSignUpModel.create({ email, password: hashPassword })

            res.status(200).json({ message: "User SignUp Successfully Done", data: addUser })

        }

    } catch (error) {
        return next(error)
    }
}

// userLogin
const userLogin = async (req, res, next) => {

    // user validation
    const userLoginSchema = joi.object({
        email: joi.string().trim().email().required(),
        password: joi.string().min(7).required(),
    })
    const { error } = userLoginSchema.validate(req.body)

    //if error in validation -> return error via middleware
    if (error) {
        return next(error);
    }

    const { email, password } = req.body

    try {

        const findUser = await UserSignUpModel.findOne({ email: email })

        if (!findUser) {
            const error = {
                status: 404,
                message: "User is Not Found please go to SignUp Page ",
            };
            return next(error)
        }

        // if match password
        const matchPassword = await bcrypt.compare(password, findUser.password)

        if (!matchPassword) {
            const error = {
                status: 401,
                message: "Invalid Credentials ",
            };
            return next(error)
        } else {
            res.status(200).json({ message: "User Login SuccessFully Done!", data: findUser })
        }

    } catch (error) {
        return next(error)
    }
}

module.exports = { userSignUp, userLogin }