const User =require("../models/User")
const jwt = require("jsonwebtoken")
const {generateotp} = require("../email/generateotp")
const {sendotpemail} =require("../email/send-otp")


exports.sendOtp = async(req,res)=>{
      try
      {
        const {name,email} =req.body;
        if(!email)
        {
            return res.status(400).json({msg:"Email required"})
        }
        let user = await User.findOne({email})
        if(!user)
        {
           userRecord = await User.create({name,email})
        }
        const otp =generateotp()
        user.otp=otp
        user.otpExpires =Date.now()+5*60*1000
        await user.save()
        await sendotpemail(email,otp)
        res.status(200).json({
            success:true,
            message:"OTP sent to your email",
            name,
        });

      }
      catch(err)
      {
        res.status(500).json({message:err.message})
      }
}

exports.verifyOtp=async(req,res)=>{
  try
  {
    const {email,otp}=req.body;
    if(!email || !otp)
    {
      return res.status(400).json({msg:"EMAIL AND OTP are required "})
    }
    const user = await User.findOne({email})
    if(!user)
    {
      return res.status(400).json({msg:"User not found"})
    }
    if(!user.otp || user.otp!==otp)
    {
         return res.status(400).json({msg:"Inavalid Otp"})
    }
    if(user.otpExpires< Date.now())
    {
      return res.status(400).json({msg:"Otp expires"})
    }
    user.otp = undefined
    user.otpExpires = undefined;
    await user.save()

    const token = jwt.sign(
      {
        _id:user._id,
        email:user.email

      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1d"
      }
    )
    res.json({
      success:true,
      token,
    });

  }
  catch(error)
  {
    res.status(500).json({msg:error.message})
  }
}

