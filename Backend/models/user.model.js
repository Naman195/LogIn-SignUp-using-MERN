import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true
    }, 
    email:{
        type: String, 
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    avater: {
        type: String, 
        
        default: ""
    }

},{timestamps: true})

const User = mongoose.model("User", userSchema)
export default User