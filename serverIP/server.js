import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path";

dotenv.config()
//import innner
import  pool  from "./config/db.js"
import authRouter from "./routes/auth.js"
import userRoutes from "./routes/userRoutes.js"
import universalRoutes from "./routes/universalRoutes.js"
import additionalRoutes from "./routes/additionalRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import gptRoutes from "./routes/gptRoutes.js"

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: process.env.USER_INTERFACE,
    credentials: true
}))

app.use(express.json())



// 🔥 THIS LINE IS MISSING
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", authRouter)
app.use("/api", userRoutes)
app.use("/api", universalRoutes)
app.use("/api", additionalRoutes)
app.use("/api", chatRoutes)
app.use("/api", gptRoutes)

const startServer = async () => {

    try{
        const client = await pool.connect()
        console.log("DB connected Succesfully")
        
        const res = await client.query("SELECT NOW()")
        console.log("DB Time", res.rows[0])

        client.release()

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on ${process.env.PORT} port`)
        })
    }
    catch(err){
        console.log("DB connection error", err.message)
    }
}

startServer()