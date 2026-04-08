import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from './config/mongodb.js'

import 'dotenv/config'
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

const port = process.env.PORT || 4000;

const allowedOrigins = ['https://kmauthentication.web.app/', 'https://kmauthentication.firebaseapp.com/']

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
connectDB()



//APIs Endpoints
app.use('/user/auth', authRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => res.send("API is working"))


app.listen(port, () => console.log(`Server started on port: ${port}`))


