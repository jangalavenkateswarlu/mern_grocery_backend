const mongoose = require("mongoose")
const Category_Enum=[
    "vegetables","fruits","food-grains"
]
const Unit_Enum=[
    "500kg","1kg","2kg","10kg"
]
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        values:Category_Enum
    },
    price:{
        type:Number,
        
    },
    unit:{
        type:String,
        values:Unit_Enum
    },
    image:{
        type:String
    },
    isActive:{
        type:Boolean
    }

},{timestamps:true})
module.exports=mongoose.model("product",productSchema)