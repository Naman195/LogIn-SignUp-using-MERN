import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

 export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")

    if(!token){
        res.status(401).json({msg: "Token not provided"})
    }

    const jwtToken = token.replace("Bearer", "").trim()
    // console.log("Token from Auth Middleware", jwtToken);

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
        // console.log(decoded);
        const userData = await User.findOne({email: decoded.email}).select({
            password: 0
        })
        // console.log(user);
        req.user = userData
        req.token = token
        req.userID = userData._id

        next()
    } catch (error) {
        console.log("Error", error);
        return res.status(401).json({message: "Unauthorized, Invalid Token"})

    }








}


