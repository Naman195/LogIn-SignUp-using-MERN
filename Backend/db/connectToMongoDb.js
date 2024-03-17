import mongoose from "mongoose"

const connectTomongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MOngoDB", error.message);
    }

}

export default connectTomongoDB