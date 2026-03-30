 const mongoose = require("mongoose")
 const product = require("./product")

 const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    items:[
        {
            product:{
                   type:mongoose.Schema.Types.ObjectId,
                   ref:"product",
                   required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ]
 },{timestamps:true})

 module.exports = mongoose.model("cart",cartSchema)