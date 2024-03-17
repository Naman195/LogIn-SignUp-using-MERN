import mongoose from "mongoose"

const uploadSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"     
    },
    image: {
        type: String,
        required: true
    },
    
},{timestamps: true})

 const Upload = mongoose.model("Upload", uploadSchema)

export default Upload

