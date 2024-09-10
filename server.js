import express, { json } from"express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";


const app = express();
const port = 5000;

//CONNECT DB

connectDB();

// MIDDLEWARE

app.use(express.json());
app.use(cookieParser());

// API 

app.use("/api",userRouter);



// SERVER 

app.listen(port,()=>{
    console.log("Server Start on http://localhost:5000");
})