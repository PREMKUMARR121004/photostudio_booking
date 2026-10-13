import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
export const registerUser=async (req,res,next)=>{
    const {name,email,password}=req.body
 
    try{
        if(!name || !email || !password){
          return  res.status(400).json("all field should be filled")
        }
    const hashedPassword= await bcrypt.hash(password,10)
    const userRegistered= await User.create({
        name,
        email,
       password:hashedPassword
    })
     return  res.status(201).json({
        name:userRegistered.name,
        email:userRegistered.email
     })
}
catch(error){
    next(error)
}
}
export const loginUser=async(req,res,next)=>{
    const{email,password}=req.body
    try{
        if(!email || !password){
            return res.status(400).json("email and password are requires")
        }
        const userlogged=await User.findOne({email})
        if(!userlogged){
            return res.status(401).json("user not found")
        }
        const compare=await bcrypt.compare(password,userlogged.password)
        if(!compare){
            return res.status(401).json("password not match")
        }
        const token=jwt.sign({
            userId:userlogged._id,
            role:userlogged.role
        },process.env.JWT_SECRET,{expiresIn:"1d"})

        return res.status(200).json({
            token:token,
            name:userlogged.name,
            email:userlogged.email,
            role:userlogged.role
        })

    }catch(error){
        next(error)
    }
}