const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const sendMail = require("../utils/sendMail.js")
require('dotenv').config()
const User = require("../models/User.js")


// SIGNUP
exports.signup = async(req,res)=>{
    const {fullName, email, password} = req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({message: "something's missing", success: false})
    }

    if(password.length < 8){
        return res.status(400).json({message : "password too short", success: false})
    }

    const isAUser = await User.findOne({email})
    console.log(isAUser)
    if(isAUser != null){
        return res.status(400).json({message: "user already exists", success: false})
    }

    try {
        const hashPassword = await bcryptjs.hash(password, 10)
        const newUser = await User.create({
            fullName,
            email,
            password: hashPassword
        })
        return res.status(200).json({message:"User Created Successfully", data : newUser, success: true})
    } catch (error) {
        return res.status(500).json({message:"Server Error", error: error.message})
    }
}


// LOGIN
exports.login = async(req, res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        return res.status(400).json({message : "email and password is required", success:false})
    }
    
    const isAUser = await User.findOne({email})
    
    if(!isAUser){
        return res.status(400).json({message:"Inavlid email or password", success:false})
    }

    console.log("user tryna login is:", isAUser)

    try {
        const comparePassword = await bcryptjs.compare(password, isAUser.password)
        if(!comparePassword){
            return res.status(401).json({message: "Invalid email or password", success: false})
        }
        const token = await jwt.sign({id:isAUser.id}, process.env.JWTSECRETKEY, {expiresIn :"1h"})

        return res.status(200).json({message: "user logged in successfully", data: {token, isAUser}, success: true})
        
    } catch (error) {
        return res.status(500).json({message: "server error", error: error.message})   
    }
}

exports.forgotPassword = async(req,res)=>{
    const {email}= req.body;
    console.log(req.body)
    if(!email){
        return res.status(400).json({message: "Please enter your email", success: false})
    }

    const isAUser = await User.findOne({email})
    if(!isAUser){
        return res.status(403).json({message:"UnauthoriZZed User!", success:false})
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000)
        const resetToken = jwt.sign({email, otp}, process.env.JWTSECRETKEY, {expiresIn: "3m"})
        console.log(`Your OTP:${otp}`)
        await sendMail(email, "Password Reset", otp)
        return res.status(200).json({message: "OTP sent on your email", data:{resetToken}, success: true})
    } catch (error) {
        console.log("real error:", error);
        
         return res.status(500).json({
            message: "Server error. Could not send reset email.", 
            success: false
        })
    }
    
}

exports.resetPassword = async(req,res)=>{
    const {otp, resetToken, newPassword} = req.body

    if(!otp || !resetToken || !newPassword){
        return res.status(400).json({message : "All fileds are required!"})
    }

    try {
        const decoded = jwt.verify(resetToken, process.env.JWTSECRETKEY)
        if (decoded.otp !== Number(otp)) {
            return res.status(400).json({message:"Invalid OTP code", success: false})           
        }

        const hashPassword = await bcryptjs.hash(newPassword, 10)
        await User.findOneAndUpdate({email: decoded.email}, {password: hashPassword})

        return res.status(200).json({ 
            message: "Password updated successfully!", 
            success: true 
        });

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error, success: false})
    }
}

