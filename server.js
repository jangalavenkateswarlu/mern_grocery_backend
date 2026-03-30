const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoutes = require("./Routes/productRoutes")
const path = require("path")
const adminroutes = require("./Routes/adminroutes")
const emailRoutes =require("./Routes/emailRoutes")
const cartRoutes =require("./Routes/cartRoutes")
const app =express()
dotenv.config()
// console.log("check",process.env.MONGO_URI)
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Data base connected successfully")
})
.catch((err)=>{
    console.log(err.message)
})
app.use("/api",productRoutes)
app.use("/admin",adminroutes)
app.use("/email",emailRoutes)
app.use("/cart",cartRoutes)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server started successfully@${PORT}`)
})
