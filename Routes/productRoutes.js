const controller = require("../controller/productcontroller")
const express = require("express")
const upload= require("../middlewares/imageMiddleware")
const protected = require("../middlewares/adminmiddleware")
const search =require("../controller/searchcontroller")
const router= express.Router()

router.post("/add-products",protected.adminmidleware,upload.single("image"),controller.createProduct)
router.get("/show-user",controller.getproducts) 
router.get("/search",search.searchproduct)
module.exports = router