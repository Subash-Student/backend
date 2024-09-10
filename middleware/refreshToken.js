import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config(); 


export const refreshToken = (req,res,next)=>{

    const cookie = req.headers.cookie;
    const prevToken = cookie.split("=")[1];
    if(!prevToken){
        return res.status(404).json({message:"No Token Found"});
    }
 jwt.verify(String(prevToken),process.env.SECRET_KEY,(err,user)=>{
    if(err){
        return res.status(400).json({message:"Authentication Failed"});
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

  const token = jwt.sign({id:user.id},process.env.SECRET_KEY,{
        expiresIn:"35s",
    });

    res.cookie(String(user.id),token,{
        path:"/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly:true,
    });
    req.id = user.id;
    next();
 });

}