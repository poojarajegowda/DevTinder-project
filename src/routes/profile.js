const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middleware/auth")
const User = require ("../models/user")
const {validateProfileData} = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async(req,res)=>{

    try{
    const user = req.user
    res.send(user)
    
    }catch(err){
         res.status(404).send("ERROR: "+ err.message)
}
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{

    try{
       if(!validateProfileData(req)) {
        throw new Error("Data cannot be updated")
       }

       const loggedInUser = req.user

       Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]))

       await loggedInUser.save()

       res.send(loggedInUser)

    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

// profileRouter.patch("/profile/changePassword", userAuth, async(req,res)=>{
//     try{
//         const ALLOWED_DATA = ["password"]

//         const modified_data = Object.keys(req.body).every((k)=>ALLOWED_DATA.includes(k))

//         if(!modified_data){
//             throw new Error("Data cannot be modified")
//         }
//         const loggedInUser = req.user

       
//         loggedInUser.password=req.body.password

//         await loggedInUser.save();

//         res.send(`${loggedInUser.firstName} your password is updated successfully`)

//     }catch(err){
//          res.status(400).send("ERROR: " + err.message)
//     }
// })

module.exports = {
    profileRouter
}