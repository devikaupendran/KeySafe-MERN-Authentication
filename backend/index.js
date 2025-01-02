import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

//initializing
dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to mongoDB')

}).catch((err) => {
    console.log(err)
})


//create PORT and run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

//middleware for handling error
app.use((err, req, res, next) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})