const controller = require("../controller/admincontroller")
const express = require("express")
const router = express.Router()
router.post("/admin-registered",controller.adminRegister)
router.post("/admin-Login",controller.adminLogin)
module.exports = router



