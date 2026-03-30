const product = require("../models/product")


exports.searchproduct =async(req,res)=>{
    try
    {
        const{search} = req.query;
        if(!search)
        {
            return res.status(400).json({msg:"search not found"})
        }
        const products = await product.find({
            name:{$regex:search,$options:"i"}
        })
        res.status(200).json({search:products})
    }
    catch(err)
    {
        return res.status(500).json({msg:err.message})
    }
}