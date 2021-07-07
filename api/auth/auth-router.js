const express = require("express")
const router = express.Router()
const User = require("../users/users-model.js")
const bcrypt = require("bcryptjs")


const checkPayload = (req,res,next)=>{
    if(!req.body.username || !req.body.password){
        res.status(401).json("Username and password required")
    }else{
        next()
    }
}

const checkUserInDB = async (req,res,next)=>{
    try{
        const rows = await User.findBy({username:req.body.username})
        if(!rows.length){
            next()
        }else{
            res.status(401).json("Username already exists")
        }
    }catch(e){
        res.status(500).json(`Server error: ${e.message}`)
    }
}

const checkUserExists = async (req,res,next)=>{
    try{
        const rows = await User.findBy({username:req.body.username})
        if(rows.length){
            req.userData = rows[0]
            next()
        }else{
            res.status(401).json("Username does not exist")
        }
    }catch(e){
        res.status(500).json(`Server error: ${e.message}`)
    }
}

router.post("/register",checkPayload,checkUserInDB, async (req,res)=>{
    try{
        const hash = bcrypt.hashSync(req.body.password,10)
        const newUser = await User.add({username:req.body.username, password:hash})
        res.status(201).json(newUser)
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

router.post("/login",checkPayload,checkUserExists, (req,res)=>{
    try{
        const verified = bcrypt.compareSync(req.body.password, req.userData.password)
        if(verified){
            req.session.user = req.userData
            res.json(`Welcome back ${req.userData.username}`)
        }else{
            res.status(401).json("Username or password are incorrect")
        }
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

router.get("/logout", (req,res)=>{
    if(req.session){
        req.session.destroy(e=>{
            if(e){
                res.json("Cant log out " + e.message)
            }else{
                res.json("Logged out successfully!")
            }
        })
    }else{
        res.json("Session doesn't exist")
    }
})

module.exports = router