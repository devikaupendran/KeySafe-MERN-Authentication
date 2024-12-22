import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to mongoDB')

}).catch((err) => {
    console.log(err)
})


//run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use('/api/user' , userRoutes)