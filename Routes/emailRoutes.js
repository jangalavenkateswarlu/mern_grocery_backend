const emailcontroller =require("../controller/emailcontroller")
const express =require("express")

const router = express.Router()

router.post("/send-otp",emailcontroller.sendOtp)
router.post("/verify-otp",emailcontroller.verifyOtp)

module.exports =router