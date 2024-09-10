import userModal from "../model/userModal.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config(); 

export const signUp = async(req,res)=>{

    const{name,email,password} = req.body;

    const exist = await userModal.findOne({email});

    if(exist){
       return res.status(400).json({message:"User already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword  = await bcrypt.hash(password,salt); 


    const newUser = new userModal({
        name:name,
        email:email,
        password:hashedPassword
    })

    try {
        
        await newUser.save();
        res.status(201).json({user:newUser});

    } catch (error) {
        console.log(error);
    }
}


const createToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:"35s"
    });
}



 export const logIn = async(req,res)=>{

    const {email,password} = req.body;
    let user;

    try {
       user = await userModal.findOne({email}); 
    } catch (error) {
        console.log(error);
    }

    if(!user){
        return res.status(400).json({message:"User Does't Exist!"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    
    if(!isMatch){
        return res.status(400).json({message:"Password does't match"});

    }

    const token = createToken(user._id);

    if(req.cookies[`${user._id}`]){
        req.cookies[`${user.id}`] = "";
    }

    res.cookie(String(user._id),token,{
        path:"/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly:true,
    })

    return res.status(200).json({message:"Successfully loged in",user:user,token:token});

}

export const getUser = async(req,res)=>{
    const userId = req.id;

    let user;
    try {
        user = await userModal.findById(userId,"-password");
    } catch (error) {
        throw new Error(Error);
    }
   if(!user){
    return res.status(404).json({message:"User not found"});
   }

   return res.status(200).json({user:user});

}