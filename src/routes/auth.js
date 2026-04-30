const express = require("express")
const authRouter = express.Router();
const {validateSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt")
const User =require("../models/user")

authRouter.post("/signup",async (req,res)=>{

const {firstName, lastName, emailID, password} =req.body

  try{
    //validate the data
    validateSignupData(req)
    //encrypt the password
     const passwordHash = await bcrypt.hash(password,10)

     const user = new User({
        firstName,
        lastName,
        emailID,
        password : passwordHash
     })

   const savedUser = await user.save()

   const token = await savedUser.getJWT();

   res.cookie("token", token,{
      expires: new Date(Date.now() + 8 * 3600000),
   })

   res.json({
    message: "User saved successfully",
    data: savedUser
   })
    }catch(err){
        console.log("ERROR: "+ err.message)
        res.status(404).send(err.message)
    }

})

authRouter.post("/login",async (req,res)=>{
//email exists
const {emailID, password} = req.body
try {
const user = await User.findOne({emailID:emailID})
console.log(user)
if(!user){
    throw new Error("Invalid credentials")
}
//password is correct
const validPassword = await user.validatePassword(password)
if(validPassword){
//create a token
const token = await user.getJWT();

//set the cookie
res.cookie("token", token, {
  expires: new Date(Date.now() + 8 * 3600000)
});

    res.send(user)
} else {
    throw new Error("Invalid credentials")
}
} catch(err){
    res.status(401).send("ERROR: "+ err.message)
}
})

authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("Logged out successfully!!!")
})

module.exports = {
    authRouter
}