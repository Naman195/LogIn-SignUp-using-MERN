import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dotenv from "dotenv"
import connectTomongoDB from './db/connectToMongoDb.js'
import cors from "cors"

const app = express()

dotenv.config()

var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    Credentials: true,
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use(express.static('public'))



app.listen(5000, ()=>{
    connectTomongoDB()
    console.log("Server listening on 5000");
})