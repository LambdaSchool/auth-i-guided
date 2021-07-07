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

const checkUserInDB = async (req,res,next)=>{
    try{
        const user = await User.findBy({username:req.body.username})
    }catch(e){
        res.status(500).json(`Server error: ${e.message}`)
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