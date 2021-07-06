const express = require("express")
const router = express.Router()

router.post("/register", (req,res)=>{
    console.log("registering")
})

router.post("/login", (req,res)=>{
    console.log("logging in")
})

module.exports = router