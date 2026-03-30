const controller = require("../controller/cartcontroller")
const express = require("express")
const email = require("../middlewares/emailmiddleware")

const router = express.Router()

router.post("/add-to-cart",email.emailmiddleware,controller.addtoCart)
router.get("/cart-details",email.emailmiddleware,controller.getcartItems)
router.put("/update-cart", email.emailmiddleware, controller.updateQuantity)
router.delete("/delete/:productId", email.emailmiddleware, controller.removeFromCart)
module.exports = router