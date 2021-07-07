const express = require("express")
const router = express.Router()
const User = require("../users/users-model.js")

const checkPayload = (req,res,next)=>{
    if(!req.body.username || !req.body.password){
        res.status(401).json("Username and password required")
    }else{
        next()
    }
}


router.post("/register",checkPayload,checkUserInDB, (req,res)=>{
    
})

router.post("/login", (req,res)=>{
    console.log("logging in")
})

router.get("/logout", (req,res)=>{
    console.log("Logout")
})

module.exports = router