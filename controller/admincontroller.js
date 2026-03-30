const admin = require("../models/admin")
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")

exports.adminRegister=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const adminrecord=await admin.findOne({email})
        if(adminrecord)
        {
            return res.status(400).json({msg:"email already exists"})
        }
        const hashpassword = await bcrypt.hash(password,10)
        const admins=admin.create({
            name,email,password:hashpassword
        })
        return res.status(201).json({msg:"admin registerd"})
    }
    catch(error){
           res.status(500).json({msg:error.message})
    }
}

exports.adminLogin=async(req,res)=>{
    try{
        const {email,password} = req.body
        const adminrecord = await admin.findOne({email})
        if(!adminrecord)
        {
            return res.status(401).json({msg:"Inavalid credentials"})
        }
        const adminpassword = await bcrypt.compare(password,adminrecord.password)
        if(!adminpassword)
        {
            return res.status(401).json({msg:"Invalid credentials"})
        }
        const token = jwt.sign(
            {adminId:adminrecord._id},process.env.JWT_SECRET,{expiresIn:'1d'}
        )
        return res.status(200).json({msg:"Login success",token})
    }
        catch(error)
        {
            res.status(500).json({msg:error.message})
        }
}