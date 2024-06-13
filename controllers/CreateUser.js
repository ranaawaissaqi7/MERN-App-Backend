const joi = require("joi")
const UserModel = require("../models/UserModel")


// getAllUser
const getAllUser = async (req, res, next) => {
    try {
        const getAllUser = await UserModel.find({});
        res.status(200).json({ message: " Get all users find successfully", data: getAllUser })
    } catch (error) {
        return next(error)
    }
}

// createUser
const createUser = async (req, res, next) => {

    // user validation
    const userSchema = joi.object({
        fName: joi.string().trim().min(3).max(50).required(),
        lName: joi.string().trim().min(3).max(50).required(),
        email: joi.string().trim().email().required(),
        phone: joi.string().min(11).max(11).required(),
        country: joi.string().trim().required(),
        city: joi.string().trim().required(),
        state: joi.string().trim().required(),
        gender: joi.string().trim().required(),
    })
    const { error } = userSchema.validate(req.body)

    //if error in validation -> return error via middleware
    if (error) {
        return next(error);
    }

    //if email or username is already registered -> return an error
    const { fName, lName, email, phone, country, city, state, gender } = req.body;

    try {
        const emailIsExit = await UserModel.exists({ email })
        if (emailIsExit) {
            const error = {
                status: 302,
                message: "User is already Exist Use another Email"
            }
            return next(error)
        }

    } catch (error) {
        return next(error)
    }

    // store data in dataBase
    try {
        const addUser = await UserModel.create({ fName, lName, email, phone, country, city, state, gender })
        res.status(200).json({ message: "User add successfully", date: addUser })

    } catch (error) {
        return next(error)
    }
}

// updateUser

const updateUser = async (req, res, next) => {

    const id = req.params.id
    const updates = req.body


    // user validation
    const userSchema = joi.object({
        fName: joi.string().trim().min(3).max(30).required(),
        lName: joi.string().trim().min(3).max(30).required(),
        email: joi.string().trim().email().required(),
        phone: joi.string().trim().min(11).max(11).required(),
        country: joi.string().trim().required(),
        city: joi.string().trim().required(),
        state: joi.string().trim().required(),
        gender: joi.string().trim().required(),
    })

    const { error } = userSchema.validate(req.body)

    //if error in validation -> return error via middleware
    if (error) {
        return next(error);
    }


    try {
        const updateUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
        if (updateUser) {
            res.status(200).json({ message: "User updated successfully", data: updateUser })
        } else {
            const error = {
                status: "404",
                message: "User not Found"
            }
            return next(error)
        }
    } catch (error) {
        return next(error)
    }
}

// getUser
const getUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const getUser = await UserModel.findById(id)

        if (getUser) {
            res.status(200).json({ message: "User find successfully", data: getUser })
        } else {
            const error = {
                status: "404",
                message: "User Not found"
            }
            return next(error)
        }
    } catch (error) {
        return next(error)
    }
}

// deleteUser
const deleteUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const delUser = await UserModel.findByIdAndDelete(id)
        if (delUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            const error = {
                status: 404,
                message: "User not found"
            }
            return next(error)
        }
    } catch (error) {
        return next(error)
    }
}


module.exports = { createUser, updateUser, getUser, deleteUser, getAllUser }