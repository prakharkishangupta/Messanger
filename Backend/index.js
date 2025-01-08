import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRouter.js";
import messageRoute from "./routes/messageRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { app, server } from "./Socket.IO/server.js";

dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


const port = process.env.PORT || 5000;
const uri = process.env.MONGOURI;

try {
    mongoose.connect(uri)
    console.log("Database connected successfully");
} catch (error) {
    console.log(error);
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(port, ()=>{
    console.log("Server is running on port ", port);
})