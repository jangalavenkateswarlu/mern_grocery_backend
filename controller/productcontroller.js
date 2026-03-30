const product =require("../models/product")
exports.createProduct=async(req,res)=>{
    try
    {
        const {name,desc,price,category,unit}=req.body
        const image = req.file?`/uploads/${req.file.filename}`:null;
        const products = await product.create({
            name,desc,price,category,unit,image
        })

        return res.status(200).json({msg:"products added",products})
         
    }
    catch(err)
    {
        console.error(err.message)
    }
}
exports.getproducts = async(req,res)=>{
    try
    {
        const newproducts= await product.find()

        return res.status(201).json({msg:"success",newproducts})
    }
    catch(err)
    {
        console.error(err.message)
    }
}
