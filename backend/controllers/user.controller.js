import { errorHandler } from "../utils/error.js"
import bacryptjs from 'bcryptjs'
import User from '../models/user.model.js'


export const test = (req, res) => {
    res.json({
        message: 'API is working'
    })
}

//Update user
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'you can update only your account'))
    }
    try {
        if (req.body.password) {
            req.body.password = bacryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                },
            },
            { new: true }
        )

        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
}

//delete user
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, " You can delete only your account"))
    }
    try {
        //delete the user by their ID
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    }
    catch (error) {
        next(error)
    }
}