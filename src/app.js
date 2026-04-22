const express= require("express")
const {connectDB}= require("./config/database")
const app= express()
const User =require("./models/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json())

app.post("/signup",async (req,res)=>{

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

   await user.save()
   res.send("User saved successfully")
    }catch(err){
        console.log("ERROR: "+ err.message)
        res.status(404).send(err.message)
    }

})

app.post("/login",async (req,res)=>{
//email exists
const {emailID, password} = req.body
try {

const user = await User.findOne({emailID:emailID})
if(!user){
    throw new Error("Invalid credentials")
}
//password is correct
const validPassword = await bcrypt.compare(password,user.password)
if(validPassword){
    res.send("Logged in successfully")
} else {
    throw new Error("Invalid credentials")
}
} catch(err){
    res.status(404).send("ERROR: "+ err.message)
}
})

app.get("/getUser",async(req,res)=>{
    const reqEmail=req.body.emailID
    try{
       const user = await User.findOne({emailID:reqEmail})
       if(user.length===0){
        res.status(404).send("User not found")
       }else{
        res.send(user)
       }
       
    }catch(err){
          console.log("Error saving the data" + err.message)
          res.status(404).send(err.message)
    }

})

app.patch("/updateUser/:userID", async(req,res)=>{
   const id = req.params?.userID
   const data = req.body
    try{

    const MODIFY_DATA = ["firstName","lastName","gender","age","skills","about"]

    const isAllowed = Object.keys(data).every((k) => MODIFY_DATA.includes(k))

    if(!isAllowed){
        throw new Error("Cannot update the data")
    }

      const user = await User.findByIdAndUpdate({_id:id},data,{runValidators:true})
      res.send("User updated successfully")
    }catch(err){
        console.log("Error saving the data" + err.message)
        res.status(404).send(err.message)
    }
})

app.get("/feed", async (req,res)=>{
    try{
   const users=await User.find({})
   res.send(users)
    } catch(err){
  console.log("Error saving the data" + err.message)
  res.status(404).send(err.message)
    }
})

app.delete("/deleteUser",async (req,res)=>{
    const id= req.body._id
    try{
      const user = await User.findByIdAndDelete({_id:id})
      res.send("User deleted successfully")
    }catch(err){
          console.log("Error saving the data" + err.message)
          res.status(404).send(err.message)
    }
})


connectDB().then(()=>{
console.log("Database connected successfully")
app.listen(7777,()=>{
    console.log("Server started successfully on port 7777")
})
}).catch((err)=>{
    console.error("Database cannot be connected")
})
