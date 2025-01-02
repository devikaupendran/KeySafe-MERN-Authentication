import User from "../models/user.model.js"
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//SIGN-UP
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfuly " })
    }
    catch (error) {
        next(error)
    }
}

//SIGN-IN
export const signin = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found')); //checking user is valid or not

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Invalid credentials')) //checking password is valid or not

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc; //stores everything except password

        //setting a expiry date for cookie
        const expiryDate = new Date(Date.now() + 3600000) // 1 hr
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    }
    catch (error) {
        next(error)
    }
}
//GOOGLE SIGNUP AND SIGNIN

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        // Check if user exists in the database
        if (user) {
            // If user exists, create and send a JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); //setting a expiry date for cookie
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
        } else {

            // If user doesn't exist, create a new user
            //generate random password
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User(
                {
                    username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                    email: req.body.email,
                    password: hashedPassword,
                    profilePicture: req.body.photo
                }
            )
            await newUser.save();    // Save the new user to the database

             // Generate a token for the new user
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000)
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }).status(200).json(rest)
        }
    }
    catch (error) {
        next(error);
    }
}

// SIGN-OUT
export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success')
}