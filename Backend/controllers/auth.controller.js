import { generateToken } from "../middleware/jwtauthToken.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import Upload from "../models/uploadfile.model.js"
// import generateToken from "../middleware/jwtauthToken.js"

export const signup = async (req, res)=> {
    

    try {
        const {fullName, userName,email, phoneNumber, password, confirmPassword, gender, file} = req.body

        if(password !== confirmPassword){
            return res.
            status(400).json({error: "Passwords Do not Match"})
        }

        const user = await User.findOne({email, phoneNumber})
        
        if(user){
            return res.status(400).json({error: "Username already Exists"})
        }

        // hash the password

        const salt = await bcrypt.genSalt(10)
        const hashedPAss = await bcrypt.hash(password, salt)


        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            userName,
            password: hashedPAss,
            gender
        })

        await newUser.save()
        const payload = {
            UserId: newUser._id,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            userName: newUser.userName
        }
        // console.log(JSON.stringify(payload))

        const token = generateToken(payload)
        // console.log("Token is", token);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            token: token
        })
        

    } catch (error) {
        console.log("Error in signUp COntroller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }

    
}

export const login = async (req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        // console.log(user.password);
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        // console.log(isPasswordCorrect);

        
        if(!user || !isPasswordCorrect) {
            res.status(400).json({error: "Invalid username or password"})
        }

        // generateToken
        const payload = {
            _id: user._id,
            email: user.email

        }
        const token = generateToken(payload)

        
        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: token
			
		});
    } catch (error) {
        console.log("Error in login COntroller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }

}
export const logout = (req, res)=> {
    // res.send("Login from Login ROutes")
    
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout COntroller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const profile =  (req, res) => {
    // console.log();
    // res.send("welcome User")
   

    try {
        const userData = req.user
    // console.log(userData);
    res.status(200).json({ userData })
    } catch (error) {
        console.log("Error in person Controller");
        res.status(500).json({error: "Internal Server Error"})
    }
    


}

// export const uploadImage = (req, res) => {
//     Upload.create({
//         image: req.file.filename,
//         // username: req.body
//     })
//     .then((result) => res.json(result))
//     .catch(err => console.log(err))
    
// }

export const uploadImage = (req, res) => {
    try {
        const file = req.file
    const filename = file.filename
    return res.status(200).json(filename)
    } catch (error) {
        res.status(500).json({error: "Image upload failed"})
    }
    

}

export const updateProfile = async (req, res) => {
    const {id}  = req.params
    const {avater} = req.body
    const oldUser = await User.findById(req.params.id)
    if(oldUser){
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {avater},
            {new: true}
        )
        res.status(200).json(updatedUser)
    }else{
        res.status(404).json("user not found for update Info")
    }
}


export const getImage = (req, res) => {
    Upload.findById(req.params.id)   
    .then(result => res.json(result))
    .catch(err => console.log(err))
}