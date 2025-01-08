import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const signup = async (req, res)=>{
    try {
        const {userName, email, password, confirmPassword} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({message:"Password not match"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "email already exist"});
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await new User({
            userName,
            email, 
            password: hashedPassword 
            
        });
        await newUser.save();
        if(newUser){
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({message:"UserRegisters Successfully", user:{
                userName:newUser.userName,
                email:newUser.email,
                _id:newUser._id
            }})
        }
    } catch (error) {
        return res.status(500).json({message:"Unknown error"})
        console.log(error);
    }
}

export const login = async (req, res)=>{
    try {
        const{email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return res.status(404).json({message: "Password not match"});
        }
        else{
            const token = createTokenAndSaveCookie(user._id, res);
            console.log("token: ", token);
            return res.status(201).json({message:"User Logged in Successfully", user:{
                userName:user.userName,
                email:user.email,
                _id:user._id
            }})
            
        }
        
    } catch (error) {
        return res.status(500).json({message:"Unknown error"})
        console.log(error);
    }
};

export const logout = (req, res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message:"User Logged out Successfully"})
    } catch (error) {
        return res.status(500).json({message:"Unknown error"})
        console.log(error);
    }
} 

export const getUserProfile = async (req, res)=>{
    try {
        console.log("cookieback: ", req.cookies);
        const loggedInUserId = req.user.userId; // ID from the token
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(500).json({message:"Unknown error"})
        console.log(error);
    }
}