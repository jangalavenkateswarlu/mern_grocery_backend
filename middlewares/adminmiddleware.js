const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const admin = require("../models/admin");

exports.adminmidleware=async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({msg:"Token required/invalid token"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.adminId = decoded.adminId
        next()
    }
    catch(error)
    {
        return res.status(403).json({msg:"invalid token"})
    }
}