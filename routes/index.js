//
const express = require('express')
const router = express.Router()
const user = require("./modules/user")
const record = require("./modules/record")
const home=require("./modules/home")
//
router.use("/user",user)
router.use("/recoed",record)
router.use("/home",home)
//
module.exports = router
