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
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default:"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        }
    },
    { timestamps: true }
);

//Creating Model
const User = mongoose.model('User', userSchema);

export default User;