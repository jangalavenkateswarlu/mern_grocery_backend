const dotenv = require("dotenv");
const jwt =require("jsonwebtoken")

dotenv.config()
exports.emailmiddleware=async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({msg:"Token required/invalid token"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded._id;
        req.useremail=decoded.email;
        next()
    }
    catch(error)
    {
        return res.status(403).json({msg:"invalid token or expired token"})
    }
}