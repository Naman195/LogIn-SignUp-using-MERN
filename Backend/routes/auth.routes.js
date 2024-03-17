import express from "express"
import { login, logout, signup, uploadImage,  updateProfile, profile } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/login",login)
router.post("/signup", signup)
router.post("/logout", logout)
//get user Data
router.get("/profile", authMiddleware, profile)
router.post("/upload", upload.single("avater"), uploadImage)
router.put("/update/:id", updateProfile)

export default router