const nodemailer=require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()


const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false, //use true for port 465,false for port 587
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD,
    },

});

exports.sendotpemail = async(email,otp)=>{
    await transporter.sendMail({
        from:`"OTP Verification" <${process.env.EMAIL_USER}>`,
        to:email,
        subject:"Your OTP code",
        html:`<h2>Your OTP is:${otp} </h2> <p>valid for 5 minutes</p>`
    });
};

