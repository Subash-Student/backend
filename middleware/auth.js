import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config(); 

export const verifyToken = (req,res,next)=>{

    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    
    if(!token){
        return res.status(400).json({message:"No token found"});
    }

    jwt.verify(String(token),process.env.SECRET_KEY,(err,user)=>{
        if(err){

            return res.status(400).json({message:"Not Authorized Log In Again"});
        }
        req.id = user.id;
        next();
    })
}

