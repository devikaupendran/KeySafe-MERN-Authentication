import mongoose from 'mongoose'

//Creating Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: true,
            required: true
        }
    },
    { timestamps: true }
);

//Creating Model
const User = mongoose.model('User', userSchema);

export default User;